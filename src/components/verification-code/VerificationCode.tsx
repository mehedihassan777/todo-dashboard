"use client";

import React, { useRef, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { post } from "@/services/http";
import { getCookie } from "@/utils/cookie";
import { UserTypeEnum } from "@/utils/enum/referral.enum";

const OTP_LENGTH = 6;
const RESEND_TIMEOUT = 180; // seconds

const VerificationCode: React.FC = () => {
	const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
	const [resendTimer, setResendTimer] = useState(RESEND_TIMEOUT);
	const [resendDisabled, setResendDisabled] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
	const router = useRouter();
	const searchParams = useSearchParams();
	const userTypeParam = searchParams?.get("ut");

	// Countdown timer for resend
	useEffect(() => {
		let timer: NodeJS.Timeout;
		if (resendDisabled && resendTimer > 0) {
			timer = setInterval(() => {
				setResendTimer(t => t - 1);
			}, 1000);
		} else if (resendTimer === 0) {
			setResendDisabled(false);
		}
		return () => clearInterval(timer);
	}, [resendDisabled, resendTimer]);

	// Focus next input on digit entry
	const handleChange = (idx: number, value: string) => {
		if (!/^[0-9]{0,1}$/.test(value)) return;
		const newOtp = [...otp];
		newOtp[idx] = value;
		setOtp(newOtp);
		setError(null);
		if (value && idx < OTP_LENGTH - 1) {
			inputRefs.current[idx + 1]?.focus();
		}
	};

	// Handle backspace: move focus back if empty
	const handleKeyDown = (
		e: React.KeyboardEvent<HTMLInputElement>,
		idx: number
	) => {
		if (e.key === "Backspace" && !otp[idx] && idx > 0) {
			inputRefs.current[idx - 1]?.focus();
		}
	};

	// Handle paste: allow full OTP paste in first input
	const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
		const paste = e.clipboardData.getData("text").replace(/\D/g, "");
		if (paste.length === OTP_LENGTH) {
			setOtp(paste.split(""));
			inputRefs.current[OTP_LENGTH - 1]?.focus();
			setError(null);
			e.preventDefault();
		}
	};

	// Confirm OTP
	const handleConfirm = async () => {
		const code = otp.join("");
		const userToken = getCookie("resetPasswordToken");
		if (!/^\d{6}$/.test(code)) {
			setError("Please enter a valid 6-digit code.");
			return;
		}
		if (!userToken) {
			setError("Session expired. Please login again.");
			return;
		}
		setError(null);
		try {
			let verifyApi = "customer/password/password-recovery-otp-verification";
			if (userTypeParam === UserTypeEnum.Community?.toString()) {
				verifyApi = "community/password/password-recovery-otp-verification";
			}
			await post(verifyApi, {
				code: code,
				userToken,
			});
			router.push(`/account/set-password?ut=${userTypeParam || "0"}`);
		} catch (error) {
			setError(
				(error as { response?: { data?: { message?: string } } })?.response
					?.data?.message || "OTP verification failed."
			);
		}
	};

	// Resend OTP
	const handleResend = async () => {
		setResendDisabled(true);
		setResendTimer(RESEND_TIMEOUT);
		const rawEmail = getCookie("email");
		const email = rawEmail ? decodeURIComponent(rawEmail) : "";
		setOtp(Array(OTP_LENGTH).fill(""));
		setError(null);
		try {
			let resendApi = "customer/password/resend-otp";
			if (userTypeParam === UserTypeEnum.Community?.toString()) {
				resendApi = "community/password/resend-otp";
			}
			await post(resendApi, {
				email,
			});
		} catch (error) {
			setError(
				(error as { response?: { data?: { message?: string } } })?.response
					?.data?.message || "Failed to resend OTP."
			);
		}
	};

	// Format timer mm:ss
	const formatTimer = (sec: number) => {
		const m = Math.floor(sec / 60)
			.toString()
			.padStart(2, "0");
		const s = (sec % 60).toString().padStart(2, "0");
		return `${m}:${s}`;
	};

	return (
		<>
			<h1 className="text-2xl lg:text-[40px] font-bold text-white text-center mt-10 lg:mt-28 mb-2">
				Forgotten Password
			</h1>
			<p className="text-center text-white text-base lg:text-2xl !mb-4 lg:!mb-10 font-normal">
				Welcome to Customer Dashboard
			</p>
			<div className="flex justify-center flex-col xl:flex-row gap-3 mb-6 max-w-[350px] xl:max-w-auto mx-auto">
				<div className="flex gap-3 justify-center">
					{Array.from({ length: OTP_LENGTH }).map((_, idx) => (
						<input
							key={idx}
							ref={el => {
								inputRefs.current[idx] = el;
							}}
							type="text"
							inputMode="numeric"
							maxLength={1}
							className={`w-12 h-12 text-center text-base border rounded-sm focus:outline-none focus:border-[#08A8FF] bg-white ${
								error ? "border-red-500" : "border-white"
							}`}
							value={otp[idx]}
							onChange={e => handleChange(idx, e.target.value)}
							onKeyDown={e => handleKeyDown(e, idx)}
							onPaste={idx === 0 ? handlePaste : undefined}
							autoFocus={idx === 0}
							aria-label={`Digit ${idx + 1}`}
						/>
					))}
				</div>
				<button
					type="button"
					className="btn btn-primary !min-w-32"
					onClick={handleConfirm}
				>
					Confirm
				</button>
			</div>
			{error && (
				<div role="alert" className="text-red-500 text-center mt-2">
					{error}
				</div>
			)}
			<h6 className="text-center text-base text-white mt-4">
				A text message with a 6-digit verification code was just sent to your
				email address.{" "}
				<button
					type="button"
					className="disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer underline disabled:decoration-transparent hover:text-[#08A8FF]"
					onClick={handleResend}
					disabled={resendDisabled}
				>
					{resendDisabled
						? `Resend in ${formatTimer(resendTimer)}`
						: "Resend OTP"}
				</button>
			</h6>
		</>
	);
};

export default VerificationCode;
