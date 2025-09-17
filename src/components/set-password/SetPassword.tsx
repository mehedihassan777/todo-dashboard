"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { post } from "@/services/http"; 
import { removeCookie, getCookie } from "@/utils/cookie";
import { UserTypeEnum } from "@/utils/enum/referral.enum";

interface ResetPasswordForm {
	newPassword: string;
	confirmPassword: string;
}

const schema = yup.object().shape({
	newPassword: yup
		.string()
		.min(10, "Password must be at least 10 characters")
		.required("New password is required"),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref("newPassword")], "Passwords must match")
		.required("Confirm password is required"),
});

function generatePassword(length = 10) {
	const chars =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
	let password = "";
	for (let i = 0; i < length; i++) {
		password += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	return password;
}

const SetPassword: React.FC = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const userTypeParam = searchParams?.get("ut");
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState<string | null>(null);
	const [showPassword, setShowPassword] = React.useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<ResetPasswordForm>({ resolver: yupResolver(schema) });

	const onSubmit = async (data: ResetPasswordForm) => {
		setLoading(true);
		setMessage(null);
		try {
			const userToken = getCookie("resetPasswordToken");
			let resetApi = "customer/password/reset-password";
			if (userTypeParam === UserTypeEnum.Community?.toString()) {
				resetApi = "community/password/reset-password";
			}
			await post(resetApi, {
				password: data.newPassword,
				userToken,
			});

			setMessage("Password reset successful. Redirecting to login...");
			setTimeout(() => router.push(`/account/login?ut=${userTypeParam || "0"}`), 1000);

			removeCookie("resetPasswordToken");
			removeCookie("email");
		} catch (error) {
			setMessage(
				(error as { response?: { data?: { message?: string } } })?.response
					?.data?.message || "Password reset failed."
			);
		} finally {
			setLoading(false);
		}
	};

	const handleGenerate = () => {
		const pwd = generatePassword();
		setValue("newPassword", pwd);
		setValue("confirmPassword", pwd);
	};

	return (
		<>
			<h1 className="text-2xl lg:text-[40px] font-bold text-white text-center mt-10 lg:mt-28 mb-2">
				New Password
			</h1>
			<p className="text-center text-white text-base lg:text-2xl !mb-4 lg:!mb-10 font-normal">
				Welcome to Customer Dashboard
			</p>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="lg:space-y-6 space-y-4"
			>
				<div className="form-group">
					<div className="relative">
						<span className="absolute inset-y-0 left-0 flex items-center pl-4 text-[#0D0D0D]">
							<svg width="18" viewBox="0 0 12 16" fillOpacity="0.6">
								<use href="/images/sprite.svg#svg-lock"></use>
							</svg>
						</span>
						<input
							id="password"
							type={showPassword ? "text" : "password"}
							autoComplete="current-password"
							placeholder="Password"
							className={`pl-11 pr-11 lg:py-5 py-4 w-full rounded-sm bg-white text-[#0D0D0D]/60 border-none outline-none text-base md:text-xl ${
								errors.newPassword ? "border border-red-500" : ""
							}`}
							{...register("newPassword")}
						/>
						<span
							className="absolute inset-y-0 right-0 flex items-center pr-4 text-[#0D0D0D] cursor-pointer"
							onClick={() => setShowPassword(v => !v)}
							role="button"
							tabIndex={0}
							aria-label={showPassword ? "Hide password" : "Show password"}
						>
							{showPassword ? (
								<svg
									width="24"
									height="14"
									viewBox="0 0 24 14"
									fillOpacity="0.6"
								>
									<use href="/images/sprite.svg#svg-eye"></use>
								</svg>
							) : (
								<svg
									width="24"
									height="16"
									viewBox="0 0 640 512"
									fillOpacity="0.6"
								>
									<use href="/images/sprite.svg#svg-eye-close"></use>
								</svg>
							)}
						</span>
					</div>
					<div className="w-full text-right">
						<button
							type="button"
							className="text-white underline cursor-pointer hover:text-blue-400"
							onClick={handleGenerate}
							disabled={loading}
						>
							Generate Password
						</button>
					</div>
					{errors.newPassword && (
						<span className="text-red-500 text-base mt-2 block">
							{errors.newPassword.message}
						</span>
					)}
				</div>

				<div className="form-group">
					<div className="relative">
						<span className="absolute inset-y-0 left-0 flex items-center pl-4 text-[#0D0D0D]">
							<svg width="18" viewBox="0 0 12 16" fillOpacity="0.6">
								<use href="/images/sprite.svg#svg-lock"></use>
							</svg>
						</span>
						<input
							id="password"
							type={showConfirmPassword ? "text" : "password"}
							autoComplete="current-password"
							placeholder="Password"
							className={`pl-11 pr-11 lg:py-5 py-4 w-full rounded-sm bg-white text-[#0D0D0D]/60 border-none outline-none text-base md:text-xl ${
								errors.confirmPassword ? "border border-red-500" : ""
							}`}
							{...register("confirmPassword")}
						/>
						<span
							className="absolute inset-y-0 right-0 flex items-center pr-4 text-[#0D0D0D] cursor-pointer"
							onClick={() => setShowConfirmPassword(v => !v)}
							role="button"
							tabIndex={0}
							aria-label={
								showConfirmPassword ? "Hide password" : "Show password"
							}
						>
							{showConfirmPassword ? (
								<svg
									width="24"
									height="14"
									viewBox="0 0 24 14"
									fillOpacity="0.6"
								>
									<use href="/images/sprite.svg#svg-eye"></use>
								</svg>
							) : (
								<svg
									width="24"
									height="16"
									viewBox="0 0 640 512"
									fillOpacity="0.6"
								>
									<use href="/images/sprite.svg#svg-eye-close"></use>
								</svg>
							)}
						</span>
					</div>

					{errors.confirmPassword && (
						<span className="text-red-500 text-base mt-2 block">
							{errors.confirmPassword.message}
						</span>
					)}
				</div>

				<button
					type="submit"
					className="btn btn-primary !min-w-full !py-4 !rounded-sm !text-base lg:!text-[21px] hover:!bg-[#3b8edc]"
					disabled={loading}
				>
					{loading ? "Loading..." : "Confirm"}
				</button>
				{message && (
					<div
						className={`text-center ${
							message.includes("successful") ? "text-green-600" : "text-red-500"
						}`}
					>
						{message}
					</div>
				)}
			</form>
		</>
	);
};

export default SetPassword;
