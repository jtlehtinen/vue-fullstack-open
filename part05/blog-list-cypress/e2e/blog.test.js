function login({ username, password }) {
  cy.get('input[name="username"]').type(username)
  cy.get('input[name="password"]').type(password)
  cy.get('button[type="submit"]').click()
  cy.contains(`${username} logged in`).should('be.visible')
}

function createBlog({ title, author, url }) {
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
    cy.request('POST', '/api/users', {
      name: 'Pekka Puu',
      username: 'pekkis',
      password: 'pa55word'
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
      login({ username: 'jtlehtinen', password: 'password' })
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
      createBlog({
        title: 'E2E testing with Cypress',
        author: 'Juha Lehtinen',
        url: 'http://example.com'
      })
      cy.contains('View').click()
      cy.contains('Like').click()
      cy.get('[data-testid="blog-likes"]').should('contain', 'Likes: 1')
    })

    it('a blog can be deleted', () => {
      createBlog({
        title: 'E2E testing with Cypress',
        author: 'Juha Lehtinen',
        url: 'http://example.com'
      })
      cy.contains('View').click()
      cy.on('window:confirm', () => true)
      cy.contains('Remove').click()
      cy.contains('E2E testing with Cypress Juha Lehtinen').should('not.exist')
    })
  })

  it('a blog cannot be deleted when not the creator', () => {
    login({ username: 'pekkis', password: 'pa55word' })
    createBlog({
      title: 'Other User Blog',
      author: 'Other User',
      url: 'http://example.com'
    })
    cy.contains('Logout').click()

    login({ username: 'jtlehtinen', password: 'password' })
    cy.contains('View').click()
    cy.contains('Remove').should('not.exist')
  })
})