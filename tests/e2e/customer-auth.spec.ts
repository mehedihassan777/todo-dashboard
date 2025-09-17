// tests/e2e/customer-auth.spec.ts
import { expect, test } from '@playwright/test';


test('redirects to login if no token cookie for /customer/dashboard', async ({ page }) => {
  await page.context().clearCookies();
  await page.goto('/customer/dashboard');
  // Should redirect to /login
  expect(page.url()).toContain('/login');
});

test('allows access to /dashboard with token and ut cookies', async ({ page }) => {
  await page.context().addCookies([
    {
      name: 'token',
      value: 'your-valid-jwt', // Replace with a valid JWT if needed
      domain: 'localhost',
      path: '/',
      httpOnly: false,
      secure: false,
      sameSite: 'Lax',
    },
    {
      name: 'ut',
      value: '0', // UserTypeEnum.Customer
      domain: 'localhost',
      path: '/',
      httpOnly: false,
      secure: false,
      sameSite: 'Lax',
    },
    {
      name: 'id',
      value: '1', // UserId
      domain: 'localhost',
      path: '/',
      httpOnly: false,
      secure: false,
      sameSite: 'Lax',
    },
  ]);
  await page.goto('/dashboard');
  // Should not redirect
  expect(page.url()).toContain('/dashboard');
  await expect(page.locator('text=Welcome to your Dashboard')).toBeVisible({ timeout: 10000 });
});
