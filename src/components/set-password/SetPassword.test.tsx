import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SetPassword from './SetPassword';
import * as http from '@/services/http';
import * as cookie from '@/utils/cookie';
import { useRouter, useSearchParams } from 'next/navigation';
import { vi } from 'vitest';
import React from 'react';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(),
}));
vi.mock('@/services/http');
vi.mock('@/utils/cookie');

describe('SetPassword', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ push: vi.fn() });
    (useSearchParams as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ get: () => null });
    (cookie.getCookie as unknown as ReturnType<typeof vi.fn>).mockImplementation((name: string) => {
      if (name === 'resetPasswordToken') return 'mock-token';
      return undefined;
    });
  });

  it('submits valid passwords and shows success message', async () => {
    (http.post as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({});
    render(<SetPassword />);
    const [passwordInput, confirmPasswordInput] = screen.getAllByPlaceholderText('Password');
    fireEvent.change(passwordInput, { target: { value: 'ValidPassword123!' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'ValidPassword123!' } });
    fireEvent.click(screen.getByRole('button', { name: /confirm/i }));
    await waitFor(() => {
      expect(http.post).toHaveBeenCalled();
      expect(screen.getByText(/Password reset successful/i)).toBeInTheDocument();
    });
  });
});
