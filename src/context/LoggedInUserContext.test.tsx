import React from "react";
import { render, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { LoggedInUserProvider, useLoggedInUser } from "./LoggedInUserContext";
import * as cookieUtils from "@/utils/cookie";

// Mock dependencies
vi.mock("@/services/http", () => ({
  get: vi.fn(() => Promise.resolve({ data: { data: {
    fullName: "Test User",
    email: "test@user.com",
    phone: "1234567890",
    image: "avatar.png"
  } } }))
}));

vi.mock("@/utils/cookie", () => ({
  getCookie: vi.fn(() => "dummyToken")
}));

const UserConsumer = () => {
  const { user, setUser } = useLoggedInUser();
  return (
    <div>
      <span data-testid="user-name">{user ? user.fullName : "No user"}</span>
      <button onClick={() => setUser(null)}>Logout</button>
    </div>
  );
};

describe("LoggedInUserContext", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches and sets user info on mount if token exists", async () => {
    const { getByTestId } = render(
      <LoggedInUserProvider>
        <UserConsumer />
      </LoggedInUserProvider>
    );
    await waitFor(() => {
      expect(getByTestId("user-name").textContent).toBe("Test User");
    });
  });

  it("sets user to null on logout", async () => {
    const { getByTestId, getByText } = render(
      <LoggedInUserProvider>
        <UserConsumer />
      </LoggedInUserProvider>
    );
    await waitFor(() => {
      expect(getByTestId("user-name").textContent).toBe("Test User");
    });
    getByText("Logout").click();
    await waitFor(() => {
      expect(getByTestId("user-name").textContent).toBe("No user");
    });
  });

  it("does not set user if no token exists", async () => {
    vi.spyOn(cookieUtils, "getCookie").mockReturnValueOnce(undefined);
    const { getByTestId } = render(
      <LoggedInUserProvider>
        <UserConsumer />
      </LoggedInUserProvider>
    );
    await waitFor(() => {
      expect(getByTestId("user-name").textContent).toBe("No user");
    });
  });
  
});
