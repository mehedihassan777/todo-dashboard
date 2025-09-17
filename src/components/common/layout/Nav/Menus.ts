"use client";
import AppConst from "@/config/app.const";
import { getCookie } from "@/utils/cookie";
import { UserTypeEnum } from "@/utils/enum/referral.enum";

export function getMenus(): Array<MenuItem> {
  const userType = getCookie("ut");

  const loggedInUser =
    userType === UserTypeEnum.Community.toString() ? "/community" : "/customer";
  return [
    {
      id: 1,
      name: "Dashboard",
      url: "/dashboard",
      iconsPath:
        AppConst.assetsBaseUrl + "images/dropdown-menu/one-stop-shop.svg",
    },
	{
      id: 2,
      name: "Posts",
      url: "/posts",
      iconsPath:
        AppConst.assetsBaseUrl + "images/dropdown-menu/one-stop-shop.svg",
    },
    {
      id: 3,
      name: "Users",
      url: "/users",
      iconsPath:
        AppConst.assetsBaseUrl + "images/dropdown-menu/one-stop-shop.svg",
    },
  ];
}

export interface MenuItem {
  id: number;
  name: string;
  iconsPath: string;
  url: string;
  children?: MenuItemChild[];
  selected?: boolean;
}
export interface MenuItemChild {
  id: number;
  name: string;
  iconsPath: string;
  url: string;
  description: string;
  selected?: boolean;
}
