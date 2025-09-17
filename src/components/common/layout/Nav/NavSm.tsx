"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getSmMenus, SmMenuItem } from "./SmMenus";
import { useLoggedInUser } from "@/context/LoggedInUserContext";
import { removeCookie } from "@/utils/cookie";
import { usePathname, useRouter } from "next/navigation";

interface NavSmProps {
	showMenu: boolean;
	closeMenu?(): void;
}

const NavSm: React.FC<NavSmProps> = ({ showMenu, closeMenu }: NavSmProps) => {
	const [menus, setMenusState] = useState<Array<SmMenuItem>>([]); 
	const { user } = useLoggedInUser();
	const router = useRouter();
	const pathname = usePathname();

		// Ensure menus are only set on client to avoid hydration mismatch
		useEffect(() => {
			setMenusState(getSmMenus());
		}, []);

	const collapseFirst = (i: number, state: string) => {
		setMenusState(
			[...menus].map((x, y) => {
				x.selected = !!(i == y) && !!(state == "open");
				return x;
			})
		);
	};

	const collapseSecond = (i: number, j: number, state: string) => {
		setMenusState(
			[...menus].map((m, index) => {
				if (index == i) {
					m.children = m.children?.map((x, y) => {
						x.selected = !!(j == y) && !!(state == "open");
						return x;
					});
				}
				return m;
			})
		);
	};

	const checkShouldMenuClose = (menu: SmMenuItem) => {
		if (menu.url?.length) {
			closeMenu && closeMenu();
		}
	};
	const handleLogout = () => {
		["token", "ut", "ref"].forEach(removeCookie);
		// If on community dashboard, redirect with ut=5
		if (pathname.startsWith("/community")) {
			router.push("/account/login?ut=5");
		} else {
			router.push("/account/login");
		}
	};

	return (
		<div className={`mobile-menu ${showMenu ? "open" : ""}`}>
			<ul className="menu-inner">
				{user && (
					<li className="flex items-center gap-3 bg-[#16426D] rounded-sm mb-4 p-3">
						<div className="">
							<div className="flex items-center gap-2 w-12 h-12 rounded-full overflow-hidden">
								<img
									src={"/images/avatar-placeholder.svg"}
									alt={user.fullName}
									className="w-12 h-12 rounded-full object-cover border-1 border-white"
								/>
							</div>
						</div>
						<div className="content">
							<h6 className="font-semibold text-white">{user.fullName}</h6>
							<h6 className="!text-sm text-gray-300 mb-1 break-all">
								{user.email}
							</h6>

							<button
								type="button"
								className="flex items-center btn bg-white py-1 px-3 w-24 font-normal text-sm"
								onClick={handleLogout}
							>
								<span className="icon mr-2">
									<svg width="12" viewBox="0 0 16 18" fill="currentColor">
										<use href="/images/sprite.svg#svg-logout"></use>
									</svg>
								</span>
								Logout
							</button>
						</div>
					</li>
				)}
				{/* First menu */}
				{menus.map((item, i) => (
					<li className="menu-list mb-5" key={"first_" + i}>
						<Link
							href={item.url}
							className="nav-link !flex gap-3 items-center !px-3 rounded-lg"
							onClick={() =>
								item.children?.length
									? collapseFirst(i, "open")
									: checkShouldMenuClose(item)
							}
						>
							<span className="flex justify-center items-center h-[40px] w-[40px] min-w-[40px]">
								<Image
									src={item.iconPath}
									alt="icon"
									width={40}
									height={40}
									loading="lazy"
									className="min-w-[40px]"
									quality={100}
								/>
							</span>
							{item.name}
							{item.children?.length && (
								<span className="icon">
									<svg
										className="inline-block"
										width="10"
										viewBox="0 0 10 6"
										fill="currentColor"
									>
										<use href="/images/sprite.svg#svg-chevron-down"></use>
									</svg>
								</span>
							)}
						</Link>
						{/* Second Child */}
						<ul className={`sm-sub-menu !pt-6 ${item.selected ? "open" : ""}`}>
							<li className="back-button">
								<Link
									href={item.url}
									className="flex items-center justify-between"
									onClick={() => collapseFirst(i, "close")}
								>
									{item.name}
									<span className="icon">
										<svg width="8" viewBox="0 0 6 10" fill="currentColor">
											<use href="/images/sprite.svg#svg-chevron-right"></use>
										</svg>
									</span>
									<span className="flex justify-center items-center h-[40px] w-[40px] min-w-[40px]">
										<Image
											src={item.iconPath}
											alt="icon"
											width={28}
											height={28}
											loading="lazy"
											quality={100}
										/>
									</span>
								</Link>
							</li>
							<ul className="pb-20 overflow-y-auto overflow-x-hidden sm-sub-menu-inner">
								<li>
									<ul className="grid grid-rows-2 grid-cols-2 gap-4 mt-4">
										{item.children?.map((child, j) => (
											<li
												className="block overflow-hidden bg-white !rounded-lg"
												key={"second_" + i + "_" + j}
											>
												<Link
													href={child.url}
													className="dropdown-product block overflow-hidden bg-white !rounded-lg"
													onClick={() =>
														child.children?.length
															? collapseSecond(i, j, "open")
															: checkShouldMenuClose(child)
													}
												>
													{/* {child.name}
														{child.children?.length && (
															<span className="icon">
																<svg width="6" viewBox="0 0 6 10" fill="currentColor">
																	<use href="/images/sprite.svg#svg-chevron-right"></use>
																</svg>
															</span>
														)} */}

													<div className="dropdown-product-img overflow-hidden !h-[110px]">
														<Image
															src={child.iconPath}
															alt={child.alt || child.name}
															width={510}
															height={300}
															loading="lazy"
															quality={100}
														/>
													</div>
													<div className="dropdown-product-content p-3">
														<div className="dropdown-product-description">
															<h4 className="mb-2 !text-[14px] !leading-4">
																{child.name}
															</h4>
															<p className="!text-[10px] !leading-3">
																{child.description}
															</p>
														</div>
													</div>
												</Link>
											</li>
										))}
									</ul>
								</li>
							</ul>
						</ul>
					</li>
				))}
			</ul>
		</div>
	);
};

export default NavSm;
