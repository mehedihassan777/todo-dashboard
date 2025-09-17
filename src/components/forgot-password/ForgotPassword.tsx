"use client";

import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { post } from "@/services/http";
import { useRouter, useSearchParams } from "next/navigation";
import { setCookie } from "@/utils/cookie";
import { SingleObjectOutput } from "@/utils/type/single-object-output";
import { UserTypeEnum } from "@/utils/enum/referral.enum";

const schema = yup
	.object({
		email: yup
			.string()
			.email("Enter a valid email address.")
			.required("Email is required."),
	})
	.required();

interface ForgotPasswordForm {
	email: string; 
}


const ForgotPassword: React.FC = () => {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<ForgotPasswordForm>({
		resolver: yupResolver(schema),
	});
	const [submitError, setSubmitError] = React.useState<string | null>(null);
	const [submitSuccess, setSubmitSuccess] = React.useState<string | null>(null);

	const searchParams = useSearchParams();
	const userTypeParam = searchParams?.get("ut");

	const onSubmit = async (data: ForgotPasswordForm) => {
		setSubmitError(null);
		setSubmitSuccess(null);
		try {
			let forgotApi = "customer/password/forgot-password";
			if ( userTypeParam === UserTypeEnum.Community?.toString()) {
				forgotApi = "community/password/forgot-password";
			}
			const response = await post<SingleObjectOutput<string>>(
				forgotApi,
				data
			);
			const token = response.data.data;
			setCookie("resetPasswordToken", token);
			setCookie("email", data.email);
			setSubmitSuccess("Reset link sent! Please check your email.");
			reset();
			if (userTypeParam) {
				router.push(`/account/verification-code?ut=${userTypeParam}`);
			} else {
				router.push("/account/verification-code");
			}
		} catch (error) {
			setSubmitError(
				(error as { response?: { data?: { message?: string } } })?.response
					?.data?.message || "Failed to send reset link."
			);
		}
	};

	return (
		<>
			<h1 className="text-2xl lg:text-[40px] font-bold text-white text-center mt-10 lg:mt-28 mb-2">
				Forgotten Password
			</h1>
			<p className="text-center text-white text-base lg:text-2xl !mb-4 lg:!mb-10 font-normal">
				Welcome to Customer Dashboard
			</p>
			<form
				className="lg:space-y-6 space-y-4"
				onSubmit={handleSubmit(onSubmit)}
				noValidate
			>
				<div className="form-group">
					<div className="relative">
						<span className="absolute inset-y-0 left-0 flex items-center pl-4 text-[#0D0D0D]">
							<svg width="20" height="17" viewBox="0 0 28 21" fillOpacity="0.6">
								<use href="/images/sprite.svg#svg-message"></use>
							</svg>
						</span>
						<input
							id="email"
							type="email"
							autoComplete="email"
							placeholder="Enter your email address"
							className={`pl-11 pr-4 lg:py-5 py-4 w-full rounded-sm bg-white text-[#0D0D0D]/60 text-base md:text-xl border-none outline-none ${
								errors.email ? "border border-red-500" : ""
							}`}
							{...register("email")}
						/>
					</div>
					{errors.email && (
						<span className="text-red-500 text-base mt-2 block">
							{errors.email.message}
						</span>
					)}
				</div>

				<button
					type="submit"
					className="btn btn-primary !min-w-full !py-4 !rounded-sm !text-base lg:!text-[21px] hover:!bg-[#3b8edc]"
					disabled={isSubmitting}
				>
					{isSubmitting ? "Sending..." : "Send reset link"}
				</button>
				{submitError && (
					<div className="text-red-500 text-base text-center">
						{submitError}
					</div>
				)}
				{submitSuccess && (
					<div className="text-green-600 text-base text-center">
						{submitSuccess}
					</div>
				)}
			</form>
		</>
	);
};

export default ForgotPassword;
