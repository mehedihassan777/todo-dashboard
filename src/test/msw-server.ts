import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

// Example handlers for your API endpoints
export const handlers = [
	http.post("/auth/login", async () => {
		// You can check request.body for credentials and return different responses
		return HttpResponse.json(
			{ token: "dummyToken", userType: "customer" },
			{ status: 200 }
		);
	}),
	http.get("/customer/info", () => {
		return HttpResponse.json(
			{
				fullName: "Test User",
				email: "test@user.com",
				phone: "123-456-7890",
				image: "",
			},
			{ status: 200 }
		);
	}),
	// Add more handlers as needed
];

export const server = setupServer(...handlers);
