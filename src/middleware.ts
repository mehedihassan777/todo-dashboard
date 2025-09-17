import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { UserTypeEnum } from "./utils/enum/referral.enum";

// List of protected path prefixes
const protectedPaths = ["/dashboard", "/community"]; // Add more as needed

  
export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const token = request.cookies.get("token")?.value;
	const userType = request.cookies.get("ut")?.value;	

	// Prevent logged-in users from accessing the login page
	if (pathname === "/account/login" && token) { 
		const dashboardUrl = "/dashboard";
		return NextResponse.redirect(new URL(dashboardUrl, request.url));
	}

	// Check if the request matches any protected path
	const needsAuth = protectedPaths.some(prefix => pathname.startsWith(prefix));
	if (needsAuth) {
		if (!token) {
			const loginUrl = new URL(`/account/login?ut=${userType ?? "0"}`, request.url);
			return NextResponse.redirect(loginUrl);
		}
	}
	return NextResponse.next();
}

export const config = {
	matcher: [
		"/dashboard((?!/_next/|/images/|/favicon.ico|/public/|/static/|/api/).*)",
		"/dashboard/:path*",
		"/community((?!/_next/|/images/|/favicon.ico|/public/|/static/|/api/).*)",
		"/community/:path*",
		"/account/login", // Ensure this matches only the login page
	],
};
