describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/login');
  })

  it('shows the login page', () => {
    cy.contains('Bienvenido de nuevo!').should('exist')
  })

  it('inputs email address and password and submit with wrong password', () => {
    cy.get('#email').type('tosheycrack12@gmail.com')
    cy.get('#password').type('1234567')
    cy.get('.login-btn').click({ force: true });
    cy.contains('La contraseña es incorrecta').should('exist')
  })

  it('navigates to register page and creates an user', () => {
    const emailBody = Math.random().toString(36).substr(2, 5);
    cy.contains('Registrate').click();
    cy.get('#name').type('Roberto')
    cy.get('#email').type(`${emailBody}@gmail.com`)
    cy.get('#password').type('pass123')
    cy.get('.login-btn').click({ force: true });
    cy.url().should('eq', Cypress.config().baseUrl + '/')
  })

  it('navigates to register page and fails to create an user', () => {
    cy.contains('Registrate').click();
    cy.get('#name').type('Roberto')
    cy.get('#email').type('tosheycrack12@gmail.com')
    cy.get('#password').type('pass123')
    cy.get('.login-btn').click({ force: true });
    cy.contains('El email ya existe').should('exist')
  })

  it('navigates to password reset page and send wrong email', () => {
    cy.contains('¿Olvidaste tu contraseña?').click();
    cy.get('#email').type('toshey@gmail.com')
    cy.get('.login-btn').click({ force: true });
    cy.contains('Usuario no registrado').should('exist')
  })
})