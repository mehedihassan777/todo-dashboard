import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { LoggedInUserProvider } from "../../context/LoggedInUserContext";
import { server } from "../../test/msw-server"; // Adjust path as needed
import Login from "./Login";

// Mock Next.js useRouter for tests
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    refresh: vi.fn(),
    back: vi.fn(),
  }),
  useSearchParams: () => ({ get: vi.fn(() => undefined) })
}));

// Unit test: renders login form
describe("Login component", () => {
  const renderWithProvider = (ui: React.ReactElement) =>
    render(<LoggedInUserProvider>{ui}</LoggedInUserProvider>);

  it("renders email and password fields", () => {
    renderWithProvider(<Login />);
    expect(
      screen.getByPlaceholderText(/email or username/i)
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();
  });

  it("shows validation errors for empty fields", async () => {
    renderWithProvider(<Login />);
    fireEvent.click(screen.getByRole("button", { name: /log in/i }));
    await waitFor(() => {
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });
  });

  it("shows error for invalid email", async () => {
    renderWithProvider(<Login />);
    fireEvent.input(screen.getByPlaceholderText(/email or username/i), {
      target: { value: "invalid-email" },
    });
    fireEvent.input(screen.getByPlaceholderText(/password/i), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /log in/i }));
    await waitFor(() => {
      expect(
        screen.getByText(/enter a valid email address/i)
      ).toBeInTheDocument();
    });
  });

  it("shows error for wrong credentials (integration)", async () => {
    // Override the login handler for this test to return a 401 error
    server.use(
      http.post("https://todo-dashboard-k7xomdpfo-mehedi-hassans-projects-9e85e73e.vercel.app//api/auth/login", () => {
        return HttpResponse.json(
          { message: "Invalid email or password." },
          { status: 401 }
        );
      })
    );

    renderWithProvider(<Login />);
    fireEvent.input(screen.getByPlaceholderText(/email or username/i), {
      target: { value: "wrong@email.com" },
    });
    fireEvent.input(screen.getByPlaceholderText(/password/i), {
      target: { value: "wrongpass" },
    });
    fireEvent.click(screen.getByRole("button", { name: /log in/i }));
    await waitFor(() => {
      expect(
        screen.getByText(/invalid email or password/i)
      ).toBeInTheDocument();
    });
  });
});
