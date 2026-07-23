export class DashboardPage {
  constructor(page) {
    this.page = page;

    // 1. Hero Section Locators
    this.heroHeading = page.getByRole("heading", {
      name: "Discover & Book Amazing Events",
    });
    this.browserEventsHeroBtn = page.getByRole("button", {
      name: "Browse Events",
    });

    // 2. Navigation Locators
    this.eventsNavTab = page.getByRole("link", { name: "Events", exact: true });
    this.myBookingsNavTab = page.getByRole("link", {
      name: "My Bookings",
      exact: true,
    });

    // 3. Footer Locators
    this.exploreAllEventsBtn = page.getByRole("button", {
      name: "Explore All Events",
    });
  }
  /* Action Methods */
  async clickBrowserEvents() {
    await this.browserEventsHeroBtn.click();
  }

  async navigateToMyBookings() {
    await this.myBookingsNavTab.click();
  }

  /* Advanced Dynamic Locator:
  Finds a card that contains specific text (the event name),
  and then find the "Book Now", button only inside that specific card.
  */
  async bookSpecificEvent(eventName) {
    // 1. Target the specific 'article' card, not a generic 'div'
    const specificEventCard = this.page
      .getByRole("article")
      .filter({ hasText: eventName });

    // 2. Click the link inside that isolated card
    await specificEventCard.getByRole("link", { name: "Book Now" }).click();
  }
}
