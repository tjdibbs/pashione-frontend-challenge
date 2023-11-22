import moment from "moment";

describe("User are fetched and rendered", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4000");
  });

  it("shows loading states", () => {
    cy.get(".skeleton-wrap").should("be.visible");
    cy.get(".refresh-btn").should("have.class", "animate-spin");
  });

  it("shows todays date", () => {
    const todaysDate = moment(Date.now()).format("ddd, D MMMM yyyy");
    cy.get(".todays-date").contains(todaysDate);
  });

  it("shows users after loading", () => {
    cy.wait(3000);
    cy.get("#Leanne-Graham").should("exist");
    cy.get(".users-count").should("have.text", "10");
  });

  it("navigate to a new route when view user is clicked", () => {
    cy.wait(3000);
    cy.get("#Leanne-Graham").find(".view-user").should("exist").click();
    cy.wait(1000).url().should("equal", "http://localhost:4000/users/1");

    cy.get(".close-view")
      .click()
      .wait(500)
      .url()
      .should("equal", "http://localhost:4000/users");
  });

  // There more test, but not time. Thank You 🙏
});
