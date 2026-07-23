import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page.js";

test.describe("Authentication Scenarios", () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });
  test("Cannot log in with invalid credentials", async ({ page }) => {
    await loginPage.performLogin(
      process.env.INVALID_EMAIL,
      process.env.INVALID_PASSWORD,
    );
    // Assuming the app shows this error text - we will verify this soon!
    await expect(page.getByText("Invalid email or password")).toBeVisible();
  });
  test("Can log in successfully with valid credentials", async ({ page }) => {
    await loginPage.performLogin(
      process.env.TEST_EMAIL,
      process.env.TEST_PASSWORD,
    );
    // Assert we successfully navigate away from the login page
    await expect(page).toHaveURL("https://eventhub.rahulshettyacademy.com");
  });
});
