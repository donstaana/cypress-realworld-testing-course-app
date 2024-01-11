describe("Newletter Subscribe Form", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000")
  })

  it("allows users to subscibe to the email list", () => {
    const email = "asdf@qwerty.com"
    cy.getByData("email-input").type(email)
    cy.getByData("submit-button").click()
    cy.getByData("success-message").should("exist").contains(email)
  })

  it("does NOT allow an invalid email address", () => {
    const email = "asdf"
    cy.getByData("email-input").type(email)
    cy.getByData("submit-button").click()
    cy.getByData("success-message").should("not.exist")
  })

  it("does NOT allow an email address already subscribed", () => {
    const email = "john@example.com"
    cy.getByData("email-input").type(email)
    cy.getByData("submit-button").click()
    cy.getByData("server-error-message").should("exist").contains(`Error: ${email} already exists. Please use a different email address.`)
  })
})