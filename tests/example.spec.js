// @ts-check
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  // Wait until DOM is ready (important for WebKit)
  await page.goto('https://playwright.dev/', {
    waitUntil: 'domcontentloaded',
  });

  // Wait for title to be set properly
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  // Ensure page is fully loaded
  await page.goto('https://playwright.dev/', {
    waitUntil: 'domcontentloaded',
  });

  const getStartedLink = page.getByRole('link', { name: 'Get started' });

  // Explicitly wait for link before clicking (Firefox/WebKit fix)
  await expect(getStartedLink).toBeVisible();
  await getStartedLink.click();

  const installationHeading = page.getByRole('heading', {
    name: 'Installation',
  });

  // Wait for navigation + heading render
  await expect(installationHeading).toBeVisible();
});
