import Cookies from "js-cookie";

/**
 * Alias for removeCookie for compatibility
 */ 

/**
 * Set a cookie (client-side only)
 * @param name Cookie name
 * @param value Cookie value
 * @param days Expiry in days (default: 1)
 */
export function setCookie(name: string, value: string, days = 1) {
    const cookieOptions: Cookies.CookieAttributes = {
        expires: days,
        path: '/',
        sameSite: 'lax', 
        secure: typeof window !== 'undefined' ? window.location.protocol === 'https:' : true,
		};
		
    if (typeof window !== 'undefined') {
        const hostname = window.location.hostname;  
        // Only set domain if not an IP address
        if (!/^\d+\.\d+\.\d+\.\d+$/.test(hostname)) {
            cookieOptions.domain = hostname.startsWith('www.') ? hostname.substring(4) : hostname;
        }
    }
    Cookies.set(name, value, cookieOptions);
}

/**
 * Get a cookie value by name (client-side only)
 */
export function getCookie(name: string): string | undefined {
	return Cookies.get(name);
}

/**
 * Remove a cookie by name (client-side only)
 */
export function removeCookie(name: string) {
    const cookieOptions: Cookies.CookieAttributes = {
        path: '/',
    };
    if (typeof window !== 'undefined') {
        const hostname = window.location.hostname;
        // Only set domain if not an IP address
        if (!/^[\d.]+$/.test(hostname)) {
            cookieOptions.domain = hostname.startsWith('www.') ? hostname.substring(4) : hostname;
        }
    }
    Cookies.remove(name, cookieOptions);
}
