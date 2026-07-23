export class LoginPage {
  constructor(page) {
    this.page = page;

    // Locators base on standard login form
    this.emailInput = page.getByPlaceholder("Email");
    this.passwordInput = page.getByLabel("Password");
    this.loginButton = page.getByRole("button", { name: "Sign In" });
  }

  async navigate() {
    await this.page.goto("https://eventhub.rahulshettyacademy.com/login");
  }

  async performLogin(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
