"use client";

import { useLoggedInUser } from "@/context/LoggedInUserContext";
import { users } from "@/dummy-data/user-data";
import { AuthService } from "@/services/auth-service";
import { setCookie } from "@/utils/cookie";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup
	.object({
		email: yup
			.string()
			.email("Enter a valid email address.")
			.required("Email is required."),
		password: yup.string().required("Password is required."),
	})
	.required();

type FormData = yup.InferType<typeof schema>;


const Login: React.FC = () => {
	const [showPassword, setShowPassword] = React.useState(false);
	const [submitError, setSubmitError] = React.useState<string | null>(null);
	const router = useRouter();
	const searchParams = useSearchParams();
	const userTypeParam = searchParams?.get("ut");
	const { setUser } = useLoggedInUser();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<FormData>({
		resolver: yupResolver(schema),
	});

	const handleTogglePassword = React.useCallback(() => {
		setShowPassword(prev => !prev);
	}, []);

	const onSubmit = React.useCallback(async (data: FormData) => {
		setSubmitError(null);
		try {
			const response = await AuthService.login(data.email, data.password);
			if (!response) {
				setSubmitError("Login failed. Please try again.");
				return;
			}
			const { token, userType, id } = response;

			setCookie("token", token, 30);
			setCookie("id", id.toString(), 30);
			setCookie("ut", userType.toString(), 30);

			const user = users.find(u => u.id == id);
			setUser({
				fullName: user?.firstName ?? "",
				email: user?.email ?? "",
				phone: user?.phone ?? "",
			});
			router.push("/dashboard");
			reset();
		} catch (error) {
			setSubmitError(
				(error as { response?: { data?: { message?: string } } })?.response?.data?.message ||
				"Invalid email or password."
			);
		}
	}, [userTypeParam, setUser, router, reset]);

	return (
		<>
			<h1 className="text-2xl lg:text-[40px] font-bold text-white text-center mt-10 lg:mt-28 mb-2">
				Login
			</h1>
			<p className="text-center text-white text-base lg:text-2xl !mb-4 lg:!mb-10 font-normal">
				Welcome to Customer Dashboard
			</p>
			<form
				className="lg:space-y-6 space-y-4"
				autoComplete="off"
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
							placeholder="Email or Username"
							className={`pl-11 pr-4 lg:py-5 py-4 w-full rounded-sm bg-white text-[#0D0D0D]/60 border-none outline-none text-base md:text-xl ${
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
								errors.password ? "border border-red-500" : ""
							}`}
							{...register("password")}
						/>
						<span
							className="absolute inset-y-0 right-0 flex items-center pr-4 text-[#0D0D0D] cursor-pointer"
							onClick={handleTogglePassword}
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

					{errors.password && (
						<span className="text-red-500 text-base mt-2 block">
							{errors.password.message}
						</span>
					)}
				</div>
				<button
					type="submit"
					className="btn btn-primary !min-w-full !py-4 !rounded-sm !text-base lg:!text-[21px] hover:!bg-[#3b8edc]"
					disabled={isSubmitting}
				>
					{isSubmitting ? "Logging in..." : "Log In"}
				</button>
				{submitError && (
					<div className="text-red-500 text-sm mt-2 text-center">
						{submitError}
					</div>
				)}
			</form>

			<div className="mt-4 lg:mt-6 text-center">
				<Link
					href={userTypeParam ? `/account/forgot-password?ut=${userTypeParam}` : "/account/forgot-password"}
					className="text-white text-base"
				>
					Forgot Password?
				</Link>
			</div>
		</>
	);
};

export default Login;
