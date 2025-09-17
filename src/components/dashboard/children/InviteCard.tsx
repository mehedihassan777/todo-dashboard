"use client";

import AppConst from "@/config/app.const";
import Image from "next/image";
import React, { useState } from "react";
import { QRCodeSVG } from 'qrcode.react';
import { useForm } from "react-hook-form";

interface InviteCardForm {
	copyLink: string;
}

interface InviteCardProps {
  referralCode?: string;
}

const InviteCard: React.FC<InviteCardProps> = ({ referralCode }) => { 
	const referralLink = AppConst.webAppBaseUrl + `enquire-now?refId=${referralCode}`;
	const { register, handleSubmit, setValue, watch } = useForm<InviteCardForm>({
		defaultValues: {
			copyLink: referralLink,
		},
	});
	const copyLink = watch("copyLink");

	const onSubmit = (data: InviteCardForm) => {
		// handle share logic here
		alert("Shared: " + data.copyLink); 
	};

	const handleCopy = () => {
		if (navigator.clipboard?.writeText) {
			navigator.clipboard.writeText(copyLink);
		} else {
			const input = document.getElementById('copyLink') as HTMLInputElement | null;
			if (input) {
				input.select();
				input.setSelectionRange(0, 99999);
				document.execCommand('copy');
				input.blur();
			}
		}
	};

	const [isShowing, setIsShowing] = useState(false);

	const handleQrCodeModal = () => {
		const show = !isShowing;
		setIsShowing(show);
		document.body.classList.toggle("overflow-hidden", show);
	};

	return (
		<div className="container mx-auto sm:mt-10 lg:mt-16 " data-testid="invite-card">
			<div className="invite-card text-white sm:rounded-xl sm:p-8 text-center md:text-left bg-[#16426D] sm:bg-[url('/images/invite-bg.png')] bg-no-repeat">
				<div className="bg-image relative h-[230px] sm:hidden">
					<Image
						src={AppConst.assetsBaseUrl + "images/contact-us/contact-us.webp"}
						fill
						loading="eager"
						priority
						alt="CHS-Website"
						sizes="100vw"
						className="image object-cover"
						quality={100}
						unoptimized
					/>
				</div>
				<div className="p-4 py-8 sm:p-0">
					<h2 className="text-3xl font-bold leading-9">
						Refer a friend, Amplify the savings
					</h2>
					<p className="!mb-6 sm:!mt-1 !mt-3 lg:text-lg text-base font-semibold text-white">
						Invite friends and give them a discount you get rewarded.
					</p>
					<form
						className="lg:flex flex-col md:flex-row gap-2 items-end w-full lg:max-w-xl"
						onSubmit={handleSubmit(onSubmit)}
					>
						<div className="flex-1 w-full">
							<label
								htmlFor="copyLink"
								className="block lg:text-lg text-base text-left font-semibold text-white mb-2"
							>
								Shareable Link
							</label>
							<div className="relative lg:mr-2">
								<input
									type="text"
									{...register("copyLink")}
									id="copyLink"
									className="w-full px-4 pr-12 py-3 bg-white rounded-lg focus:outline-none box-shadow-none text-[#0d0d0d]/60"
									placeholder="Copy and share your link"
									readOnly
								/>
								<span
									className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#444] transition-colors hover:text-[#08A8FF] cursor-pointer"
									onClick={handleCopy}
									title="Copy link"
								>
									<svg width="20" viewBox="0 0 20 20" fill="currentColor">
										<use href="/images/sprite.svg#svg-copy"></use>
									</svg>
								</span>
							</div>
						</div>
						<div className="flex items-center gap-4 lg:gap-2 w-full lg:w-auto justify-between mt-4 lg:mt-0">
							<button
								type="button"
								className="btn btn-primary !py-[11px] !px-3 !rounded-lg lg:!min-w-auto w-full"
								onClick={handleQrCodeModal}
							>
								<svg
									width="26"
									viewBox="0 0 26 26"
									fill="currentColor"
									className="m-auto"
								>
									<use href="/images/sprite.svg#svg-qr-code"></use>
								</svg>
							</button>
							{/* <button
								type="button"
								className="btn btn-primary !rounded-lg w-full lg:!min-w-[150px] !font-bold"
								onClick={handleQrCodeModal}
							>
								Share
							</button> */}
						</div>

						<div
							className={`modal-overlay ${isShowing ? "overlay-active" : ""}`}
						></div>
						<div className={`app-modal ${isShowing ? "open" : ""}`}>
							<div className="app-modal-body how-it-work-modal">
								<button
									type="button"
									className="app-modal-close md:top-6 md:right-6 cursor-pointer"
									onClick={handleQrCodeModal}
								>
									<svg width="17" viewBox="0 0 18 18" fill="white">
										<use href="/images/sprite.svg#svg-close"></use>
									</svg>
								</button>
								<div className="max-w-[845px] m-auto text-center modal-auto pt-5 lg:pt-16 px-3">
									<h6 className="text-[#0d0d0d]/60 mb-4">
										Scan & Get the Link
									</h6>
									<div className="m-auto mb-6 flex justify-center">
										<QRCodeSVG value={referralLink} size={160} bgColor="#fff" fgColor="#16426D" />
									</div>
									{/* <button type="button" className="btn btn-secondary">
										Share QR Code
									</button> */}
									<h6 className="text-[#0d0d0d]/60 my-6">
										Or Copy & Share the link
									</h6>

									<div className="relative my-6 max-w-lg mx-auto">
										<input
											type="text"
											{...register("copyLink")}
											id="copyLinkModal"
											className="w-full px-4 pr-12 py-3 bg-white rounded-lg focus:outline-none box-shadow-none text-[#0d0d0d]/60 border border-[#0d0d0d]/15"
											placeholder="Copy and share your link"
											readOnly
										/>
										<span
											className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#444] transition-colors hover:text-[#08A8FF] cursor-pointer"
											onClick={handleCopy}
											title="Copy link"
										>
											<svg width="20" viewBox="0 0 20 20" fill="currentColor">
												<use href="/images/sprite.svg#svg-copy"></use>
											</svg>
										</span>
									</div>

									{/* <button type="button" className="btn btn-primary">
										Share Link
									</button> */}
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default InviteCard;
