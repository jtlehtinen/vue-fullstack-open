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
})