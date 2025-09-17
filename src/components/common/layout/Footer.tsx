"use client"
import AppConst from "@/config/app.const";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Footer: React.FC = () => {
  	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const scrollTop = window.pageYOffset;
			setIsVisible(scrollTop > 300);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	return (
		<footer className="app-footer"> 
			<div className="app-footer-widgets py-[40px] lg:pt-[96px] lg:pb-[72px] px-[15px]">
				<div className="container mx-auto ">
					<div className="sm:flex flex-wrap mx-[-15px]">
						<div
							className="lg:w-1/5 sm:w-1/3 mb-[24px] px-[15px]"
							data-aos="fade-up"
							data-aos-duration="300"
						>
							<div className="app-footer-widget text-center sm:text-left link-list">
								<h2 className="f-widgets-title mb-[10px]">Services</h2>
								<ul className="navbar-nav">
									<li>
										<Link href="#">
											One Stop Shop Service
										</Link>
									</li>
									<li>
										<Link href="#">Insulation</Link>
									</li>
									<li>
										<Link href="#">Ventilation</Link>
									</li>
									<li>
										<Link href="#">
											Heating Upgrades
										</Link>
									</li>
									<li>
										<Link href="#">Solar PV</Link>
									</li>
								</ul>
							</div>
						</div>
						<div
							className="lg:w-1/5  sm:w-1/3  mb-[24px] px-[15px]"
							data-aos="fade-up"
							data-aos-duration="400"
						>
							<div className="app-footer-widget  text-center sm:text-left link-list">
								<h2 className="f-widgets-title mb-[10px]">Company</h2>
								<ul className="navbar-nav">
									<li>
										<Link href="#">About Us</Link>
									</li>
									<li>
										<Link href="#">Contact Us</Link>
									</li>
									<li>
										<Link href="#">Careers</Link>
									</li>
									{/* <li>
										<Link href="/our-company/events">Events</Link>
									</li>
									<li>
										<Link href="/our-company/recent-projects">
											Recent Projects
										</Link>
									</li> */}
									<li>
										<Link href="#">
											Accreditations
										</Link>
									</li>
									<li>
										<Link href="#">Guarantees</Link>
									</li>
									<li>
										<Link href="#">
											<span className="text-[#ED2531]">
												Certified<sup>TM</sup>{" "}
											</span>{" "}
											Great Place to Work
										</Link>
									</li>
								</ul>
							</div>
						</div>
						<div
							className="lg:w-1/5 sm:w-1/3 mb-[24px] px-[15px]"
							data-aos="fade-up"
							data-aos-duration="500"
						>
							<div className="app-footer-widget  text-center sm:text-left link-list">
								<h2 className="f-widgets-title mb-[10px]">Grants & Finance</h2>
								<ul className="navbar-nav">
									<li>
										<Link href="#">
											One Stop Shop Service
										</Link>
									</li>
									<li>
										<Link href="#">
											Individual Energy Upgrades
										</Link>
									</li>
									<li>
										<Link href="#">
											Free Energy Upgrades
										</Link>
									</li>
									<li>
										<Link href="#">Finance Options</Link>
									</li>
								</ul>
							</div>
						</div>
						<div
							className="lg:w-1/6 sm:w-1/3  mb-[24px] px-[15px]"
							data-aos="fade-up"
							data-aos-duration="600"
						>
							<div className="app-footer-widget  text-center sm:text-left link-list">
								<h2 className="f-widgets-title mb-[10px]">More</h2>
								<ul className="navbar-nav">
									<li>
										<Link href="#">Terms & Conditions</Link>
									</li>
									<li>
										<Link href="#">Privacy Policy</Link>
									</li>
									<li>
										<Link href="#">Payment Policy</Link>
									</li>
									<li>
										<Link href="#">Cookies Policy</Link>
									</li>
									<li>
										<a
											target="_blank"
											href="#"
											rel="noopener noreferrer"
										>
											Customer Charter
										</a>
									</li>
									{/* <li>
										<Link href={AppConst.wpSiteUrl + "faq/"}>FAQ</Link>
									</li> */}
								</ul>
							</div>
						</div>
						<div
							className="lg:w-1/5 sm:w-1/3  px-[15px]"
							data-aos="fade-up"
							data-aos-duration="700"
						>
							<div className="app-footer-widget  text-center sm:text-left link-image">
								<Link
									href="#"
									className="block"
								>
									<Image
										src={
											AppConst.assetsBaseUrl +
											"images/events/events-details/badge1.svg"
										}
										alt="badge"
										width={216}
										height={369}
										quality={100}
										className="w-10 sm:mx-0 mb-4 mx-auto"
									/>
								</Link>
								<h2 className="f-widgets-title mb-[10px]">Follow Us</h2>
								<ul className="navbar-nav mr-auto flex flex-row justify-center sm:justify-start footer-social">
									<li>
										<Link href="#">
											<svg width="11" viewBox="0 0 11 19" fill="currentColor">
												<use href="/images/sprite.svg#svg-facebook"></use>
											</svg>
										</Link>
									</li>
									<li>
										<Link href="#">
											<svg width="19" viewBox="0 0 18 19" fill="currentColor">
												<use href="/images/sprite.svg#svg-isntagram"></use>
											</svg>
										</Link>
									</li>
									<li>
										<Link href="#">
											<svg width="19" viewBox="0 0 19 19" fill="currentColor">
												<use href="/images/sprite.svg#svg-linkedin"></use>
											</svg>
										</Link>
									</li>
									<li>
										<Link href="#">
											<svg width="19" viewBox="0 0 19 14" fill="currentColor">
												<use href="/images/sprite.svg#svg-youtube"></use>
											</svg>
										</Link>
									</li>
								</ul>

								<h2 className="f-widgets-title mt-4 mb-2">Head Office</h2>
								<p className="text-center sm:text-left text-sm leading-[18px] mb-2">
									Crossmolina Business Park, <br /> Ballina Road, Crossmolina,{" "}
									<br /> Co. Mayo, F26 E9A0
								</p>
								<p className="text-center sm:text-left text-sm leading-[18px] py-2">
									Company Reg. No. 499398
								</p>
								<p className="text-center sm:text-left text-sm leading-[18px]">
									VAT No. IE 9791592A
								</p>

								<h2 className="f-widgets-title mb-1 mt-4">Service Brochure</h2>
								<Link
									target="_blank"
									href="#"
									rel="noopener noreferrer"
									className="flex items-center justify-center sm:justify-start text-sm hover:text-[#10357F] transition"
								>
									<span className="h-10 w-10 rounded-full bg-[#10357F] flex place-content-center mr-2 text-white">
										<svg width="18" viewBox="0 0 18 17" fill="currentColor">
											<use href="/images/sprite.svg#svg-download"></use>
										</svg>
									</span>
									<span className="leading-none mt-1">PDF, 12 MB</span>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="app-footer-copyright md:py-[14px] py-2">
				<div className="container mx-auto text-center">
					<p className="md:text-base text-sm">
						© {new Date().getFullYear()} | Customer Dashboard{" "}
					</p>
				</div>
			</div>
			<button
				onClick={scrollToTop}
				className={`scroll-to-top md:p-0 p-2 fixed right-[50px] md:!bottom-[50px] !bottom-[85px] h-8 w-8 md:h-12 md:w-12 rounded-full text-white flex items-center justify-center !z-[10] ${
					isVisible ? "opacity-1" : "opacity-0"
				}`}
			>
				<svg width="20" viewBox="0 0 20 20" fill="currentColor">
					<use href="/images/sprite.svg#svg-arrow-up"></use>
				</svg>
			</button>
		</footer>
	);
}

export default Footer;
