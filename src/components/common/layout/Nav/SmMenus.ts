import AppConst from "@/config/app.const";
import { getCookie } from "@/utils/cookie";
import { UserTypeEnum } from "@/utils/enum/referral.enum";

export function getSmMenus(): Array<SmMenuItem> {
	const userType = getCookie("ut");

	const loggedInUser =
		userType === UserTypeEnum.Community.toString() ? "/community" : "/customer";
	return [
		{
			id: 0,
			name: "Dashboard",
			url: loggedInUser + "/dashboard",
			iconPath: AppConst.assetsBaseUrl + "images/dropdown-menu/grants.svg",
			alt: "iconPath",
		},
	];
}

export interface SmMenuItem {
	id: number;
	name: string;
	url: string;
	description?: string;
	children?: SmMenuItem[];
	selected?: boolean;
	iconPath: string;
	alt?: string;
}
