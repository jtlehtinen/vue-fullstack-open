describe('Blog app', () => {
  beforeEach(() => {
    cy.request('POST', '/api/testing/reset')
    cy.request('POST', '/api/users', {
      name: 'Juha Lehtinen',
      username: 'jtlehtinen',
      password: 'password'
    })
    cy.visit('/')
  })

  it('Login form is shown', () => {
    cy.contains('Login').should('be.visible')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', () => {
      cy.get('input[name="username"]').type('jtlehtinen')
      cy.get('input[name="password"]').type('password')
      cy.get('button[type="submit"]').click()
      cy.contains('jtlehtinen logged in').should('be.visible')
    })

    it('fails with wrong credentials', () => {
      cy.get('input[name="username"]').type('jtlehtinen')
      cy.get('input[name="password"]').type('invalid')
      cy.get('button[type="submit"]').click()
      cy.contains('invalid username or password').should('be.visible')
      cy.contains('jtlehtinen logged in').should('not.exist')
    })
  })
})