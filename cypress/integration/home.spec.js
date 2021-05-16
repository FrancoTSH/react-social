describe('Home Page', () => {
  const email = Cypress.env('email'),
    password = Cypress.env('password')

  beforeEach(() => {
    cy.visit('/', {
      onBeforeLoad: (win) => {
        win.sessionStorage.clear()
      }
    });
  })

  it('shows the home page and posts', () => {
    cy.get('.post').should('exist');
  })

  it('allows the user to sign in', () => {
    cy.contains('Ingresar').click();
    cy.get('#email').type(email)
    cy.get('#password').type(password)
    cy.get('.login-btn').click({ force: true });
    cy.get('.avatar-img').should('exist')
  })

  describe('when logged in', () => {
    beforeEach(() => {
      cy.login(email, password)
    })

    it('add a comment to a post', () => {
      const commentText = Math.random().toString(36).substr(2, 5);
      cy.get('input[name="comment"]:first').type(commentText)
      cy.contains('Publicar').click();
      cy.contains(commentText).should('exist')
    })

    it('likes a post', () => {
      cy.get('.comments__like:first').click()
      cy.get('.comments__like-info:first').contains('2 Me gusta');
      cy.get('.comments__like-btn:first').should('have.class', 'liked')
    })

    it('sign out', () => {
      cy.get('.avatar-img').click()
      cy.get('.sub-menu li:last-child .sub-menu-link').click()
      cy.get('.avatar-img').should('not.exist')
      cy.contains('Acceder').should('exist')
    })
  })
})