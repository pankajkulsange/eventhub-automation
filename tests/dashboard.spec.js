import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page.js";
import { DashboardPage } from "../pages/dashboard.page.js";

test.describe("Dashboard Regression Suite", () => {
  let dashboardPage;

  // Before every test in this file, we must login first
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);

    await loginPage.navigate();
    await loginPage.performLogin(
      process.env.TEST_EMAIL,
      process.env.TEST_PASSWORD,
    );

    // Ensure we are on the dashboard before starting test actions
    await expect(dashboardPage.heroHeading).toBeVisible();
  });

  test("User can click Book Now for a specific Featured Event", async ({
    page,
  }) => {
    await dashboardPage.bookSpecificEvent("Hollywood Monsoon Night");
    await expect(page).not.toHaveURL("https://eventhub.rahulshettyacademy.com");
  });

  test("Verify Footer Call to Action routing", async ({ page }) => {
    await dashboardPage.exploreAllEventsBtn.click();
    await expect(page).toHaveURL(/.*events.*/);
  });
});
