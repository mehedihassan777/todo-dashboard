import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import VerificationCode from './VerificationCode';
import * as http from '@/services/http';
import * as cookie from '@/utils/cookie';
import { useRouter, useSearchParams } from 'next/navigation';
import { vi } from 'vitest';
import React from "react";

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(),
}));
vi.mock('@/services/http');
vi.mock('@/utils/cookie');

describe('VerificationCode', () => {
  const push = vi.fn();
  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ push });
    (useSearchParams as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ get: () => null });
    (cookie.getCookie as unknown as ReturnType<typeof vi.fn>).mockImplementation((name: string) => {
      if (name === 'resetPasswordToken') return 'mock-token';
      if (name === 'email') return encodeURIComponent('test@example.com');
      return undefined;
    });
  });

  it('calls API and navigates on valid OTP', async () => {
    (http.post as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({});
    render(<VerificationCode />);
    const inputs = screen.getAllByRole('textbox');
    inputs.forEach((input, idx) => {
      fireEvent.change(input, { target: { value: String(idx + 1) } });
    });
    fireEvent.click(screen.getByRole('button', { name: /confirm/i }));
    await waitFor(() => {
      expect(http.post).toHaveBeenCalled();
      expect(push).toHaveBeenCalled();
    });
  });
});
