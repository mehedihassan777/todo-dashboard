"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { removeCookie } from "@/utils/cookie";
import Link from "next/link";
import { getMenus, MenuItem } from "./Menus";
import { usePathname } from "next/navigation";
import { useLoggedInUser } from "@/context/LoggedInUserContext";

interface NavProps {
	isActive: boolean;
	onToggleDropdown: () => void;
	closeMenu?(): void;
	openModal: () => void;
}

const NavLarge: React.FC<NavProps> = ({ isActive, closeMenu }: NavProps) => {
	const [menus, setMenus] = useState<Array<MenuItem>>([]);
	const { user } = useLoggedInUser();
	const pathname = usePathname();
	const router = useRouter();

	// Ensure menus are only set on client to avoid hydration mismatch
	useEffect(() => {
		setMenus(getMenus());
	}, []);

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
		<div className="navbar-collapse">
			<ul className="main-menu main-menu-v2 navbar-nav flex items-center">
				<li
					className={`dropdown md:py-[26px] py-[15px] ${
						isActive ? "active" : ""
					}`}
				></li>
				{menus.map((item, i) => (
					<li
						key={"first_" + i}
						className={`dropdown md:py-[26px] py-[15px] ${
							pathname === `${item.url}` ? "active" : ""
						}`}
						onClick={closeMenu}
					>
						<Link href={item.url}>
							{item.name}
							{!item.url && (
								<span className="icon ml-2 first-arrow">
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
					</li>
				))}
				{user && (
					<li className="dropdown md:!ml-14 md:py-5 py-[15px]">
						<div className="flex items-center gap-2">
							<img
								src={user.image || "/images/avatar-placeholder.svg"}
								alt={user.fullName}
								className="w-8 h-8 rounded-full object-cover"
							/>
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
						</div>
						<ul className="dropdown-menu">
							{/* <li>
								<Link href="/account">{user.fullName}</Link>
							</li> */}
							<li>
								<button
									type="button"
									className="!flex !items-center p-4 cursor-pointer w-full"
									onClick={handleLogout}
								>
									<span className="icon mr-2">
										<svg
											width="16"
											height="18"
											viewBox="0 0 16 18"
											fill="currentColor"
										>
											<use href="/images/sprite.svg#svg-logout"></use>
										</svg>
									</span>
									Logout
								</button>
							</li>
						</ul>
					</li>
				)}
			</ul>
		</div>
	);
};

export default NavLarge;
