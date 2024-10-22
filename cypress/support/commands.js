Cypress.Commands.add('fillMandatoryFieldsAndSubmit', form => {
    cy.get('#firstName').type(form.firstName)
    cy.get('#lastName').type(form.lastName)
    cy.get('#email').type(form.email)
    cy.get('#open-text-area').type(form.text, {delay: 0})
    cy.contains('button', 'Enviar').click()
})