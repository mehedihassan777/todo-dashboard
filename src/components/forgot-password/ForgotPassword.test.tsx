import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ForgotPassword from "./ForgotPassword";
import { post } from "@/services/http";
import { setCookie } from "@/utils/cookie";
import { useRouter } from "next/navigation";

// Mock dependencies
vi.mock("@/services/http", () => ({
  post: vi.fn(() => Promise.resolve({ data: { data: "token123" } })),
}));
vi.mock("@/utils/cookie", () => ({
  setCookie: vi.fn(),
}));
const push = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
  useSearchParams: () => ({ get: vi.fn(() => undefined) })
}));

describe("ForgotPassword", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders heading, input, and button", () => {
    render(<ForgotPassword />);
    expect(screen.getByText(/Forgotten Password/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter your email address/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /send reset link/i })).toBeInTheDocument();
  });

  it("shows validation error for empty email", async () => {
    render(<ForgotPassword />);
    fireEvent.submit(screen.getByRole("button", { name: /send reset link/i }));
    await waitFor(() => {
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
    });
  });

  it("shows validation error for invalid email", async () => {
    render(<ForgotPassword />);
    fireEvent.change(screen.getByPlaceholderText(/Enter your email address/i), {
      target: { value: "notanemail" },
    });
    fireEvent.submit(screen.getByRole("button", { name: /send reset link/i }));
    await waitFor(() => {
      expect(screen.getByText(/Enter a valid email address/i)).toBeInTheDocument();
    });
  });

  it("submits and shows success message, sets cookies, and navigates", async () => {
    render(<ForgotPassword />);
    fireEvent.change(screen.getByPlaceholderText(/Enter your email address/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.submit(screen.getByRole("button", { name: /send reset link/i }));
    await waitFor(() => {
      expect(post).toHaveBeenCalledWith(
        "customer/password/forgot-password",
        { email: "test@example.com" }
      );
      expect(setCookie).toHaveBeenCalledWith("resetPasswordToken", "token123");
      expect(setCookie).toHaveBeenCalledWith("email", "test@example.com");
      expect(
        screen.getByText((content) => content.includes("Reset link sent"))
      ).toBeInTheDocument();
      expect(useRouter().push).toHaveBeenCalledWith("/account/verification-code");
    });
  });

  it("shows error if API fails", async () => {
    (post as unknown as { mockRejectedValueOnce: (value: unknown) => void }).mockRejectedValueOnce({ response: { data: { message: "Failed to send reset link." } } });
    render(<ForgotPassword />);
    fireEvent.change(screen.getByPlaceholderText(/Enter your email address/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.submit(screen.getByRole("button", { name: /send reset link/i }));
    await waitFor(() => {
      expect(screen.getByText(/Failed to send reset link/i)).toBeInTheDocument();
    });
  });
});
