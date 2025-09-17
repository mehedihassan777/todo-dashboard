"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import NavLarge from "./NavLarge";
import CountUp from "react-countup";
import NavSm from "./NavSm";
import AppConst from "@/config/app.const";
import { getCookie } from "@/utils/cookie";

// interface NavProps {}

const Nav: React.FC = () => {
	const [isShowing, setIsShowing] = useState(false);
	const [showButton, setShowButton] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [referralCode, setReferralCode] = useState<string>("");

	useEffect(() => {
		setReferralCode(getCookie("ref") || "");
	}, []);
	const referralLink =
		AppConst.webAppBaseUrl + `enquire-now?refId=${referralCode}`;

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 100) {
				setShowButton(true);
			} else {
				setShowButton(false);
			}
		};

		window.addEventListener("scroll", handleScroll);

		// Remove the scroll event listener when the component unmounts
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	// Function to toggle the dropdown
	const toggleDropdown = () => {
		setIsDropdownOpen(prev => !prev);
	};

	const childRef = useRef<{ handleClick: () => void }>(null);

	return (
		<>
			<header className="app-header">
				<div className="app-header-top px-[16px] py-[5px]">
					<div className="mx-auto container justify-center">
						<div className="w-full">
							<div className="contact-info flex sm:justify-end justify-between">
								<a
									className="flex justify-end items-center sm:mr-[30px]"
									href="mailto:enquiries@churchfieldhomeservices.ie"
									id="chs_h_email"
								>
									<span className="sm:mr-[10px] mr-[5px] icon">
										<svg width="15" viewBox="0 0 13 9" fill="currentColor">
											<use href="/images/sprite.svg#svg-envelope-outline"></use>
										</svg>
									</span>
									enquiries@churchfieldhomeservices.ie
								</a>
								<a
									className="flex justify-end items-center"
									href="tel:0818011022"
									id="chs_h_phone"
								>
									<span className="sm:mr-[10px] mr-[5px] icon">
										<svg width="14" viewBox="0 0 12 13" fill="currentColor">
											<use href="/images/sprite.svg#svg-phone-outline"></use>
										</svg>
									</span>
									0818 011 022
								</a>
							</div>
						</div>
					</div>
				</div>
				<div className="app-header-menu lg:bg-white bg-[#F6F7F8] py-[10px] px-[16px] lg:py-0">
					<div className="mx-auto container justify-center">
						<nav className="w-full flex justify-between items-center">
							<div className="nabbar-brand">
								<div className="flex items-center">
									<Link
										className="lg:w-[182px] w-[135px] lg:mr-[130px] xl:mr-[200px] mr-[75px] logo"
										href="https://todo-dashboard-k7xomdpfo-mehedi-hassans-projects-9e85e73e.vercel.app/"
										onClick={() => setIsDropdownOpen(false)}
									>
										<Image
											src={
												AppConst.assetsBaseUrl +
												"images/churchfield-home-services-logo.svg"
											}
											alt="chrchfield home services logo, chrchfield home services logo, Home services, wall insulation companies, external wall insulation companies, house insulation contractors, insulation companies"
											width={0}
											height={0}
											className="w-full h-auto"
											sizes="100vw"
										></Image>
									</Link>
									<Link
										href="#"
										className="seai-grants-logo z-50"
									>
										<Image
											src={
												AppConst.assetsBaseUrl +
												"images/seai-grants-available.svg"
											}
											alt="CHS-Website"
											width={0}
											height={0}
											className="w-full h-auto"
											sizes="100vw"
										></Image>
									</Link>
									<div className="customer pb-[4px]">
										<p className="flex items-center">
											<span className="icon mr-2">
												<svg
													className="inline-block"
													width="8"
													viewBox="0 0 8 7"
													fill="currentColor"
												>
													<use href="/images/sprite.svg#svg-check"></use>
												</svg>
											</span>
											<small className="font-[600]">
												We’ve helped <br />
												<span>
													<CountUp
														end={5950}
														duration={15}
														enableScrollSpy
														scrollSpyOnce={true}
													/>
												</span>{" "}
												customers
											</small>
										</p>
									</div>
								</div>
								<div className="flex">
									<button
										type="button"
										role="button"
										aria-label="Toggle-button"
										className="toggle-button"
										onClick={() => setIsShowing(!isShowing)}
									>
										{isShowing ? (
											<svg
												width="26"
												height="22"
												viewBox="0 0 18 18"
												fill="#0F2F54"
											>
												<use href="/images/sprite.svg#svg-close"></use>
											</svg>
										) : (
											<svg width="32" viewBox="0 0 24 16" fill="none">
												<use href="/images/sprite.svg#svg-union"></use>
											</svg>
										)}
									</button>
								</div>
							</div>
							{/* Desktop Menus */}
							<NavLarge
								isActive={isDropdownOpen}
								onToggleDropdown={toggleDropdown}
								closeMenu={() => setIsDropdownOpen(false)}
								openModal={() => childRef.current?.handleClick()}
							/>
							{/* Mobile Device Menus */}
							<NavSm
								showMenu={isShowing}
								closeMenu={() => setIsShowing(false)}
							/>
						</nav>
					</div>
				</div>

				{/* Button fixed to bottom  */}
				<Link
					href={referralLink}
					className={`btn btn-secondary md:!hidden fixed bottom-0 !min-w-full z-50 enquire-sm-btn ${
						showButton ? "!block" : "!hidden"
					}`}
					id="chs_sm_header"
				>
					Add New Referral Project
				</Link>
			</header>
		</>
	);
};

export default Nav;
