function login(username, password) {
  cy.get('input[name="username"]').type(username)
  cy.get('input[name="password"]').type(password)
  cy.get('button[type="submit"]').click()
  cy.contains('jtlehtinen logged in').should('be.visible')
}

function createBlog(title, author, url) {
  cy.contains('Create new blog').click()
  cy.get('[data-testid="blog-form-title"]').type(title)
  cy.get('[data-testid="blog-form-author"]').type(author)
  cy.get('[data-testid="blog-form-url"]').type(url)
  cy.get('button[type="submit"]').click()
}

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

  describe('When logged in', () => {
    beforeEach(() => {
      login('jtlehtinen', 'password')
    })

    it('a blog can be created', () => {
      cy.contains('Create new blog').click()
      cy.get('[data-testid="blog-form-title"]').type('E2E testing with Cypress')
      cy.get('[data-testid="blog-form-author"]').type('Juha Lehtinen')
      cy.get('[data-testid="blog-form-url"]').type('http://example.com')
      cy.get('button[type="submit"]').click()
      cy.contains('E2E testing with Cypress Juha Lehtinen').should('be.visible')
    })

    it('a blog can be liked', () => {
      createBlog('E2E testing with Cypress', 'Juha Lehtinen', 'http://example.com')
      cy.contains('View').click()
      cy.contains('Like').click()
      cy.get('[data-testid="blog-likes"]').should('contain', 'Likes: 1')
    })
  })
})