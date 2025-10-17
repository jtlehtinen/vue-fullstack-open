import { test, expect } from '@playwright/test'
import { createBlog, loginWith } from './helper.js'

test.describe('Blog app', () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')

    await request.post('/api/users', {
      data: {
        name: 'Juha Lehtinen',
        username: 'jtlehtinen',
        password: 'password'
      }
    })

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('Login')).toBeVisible()
  })

  test.describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'jtlehtinen', 'password')
      await expect(page.getByText('jtlehtinen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'jtlehtinen', 'invalid')
      await expect(page.getByText('invalid username or password')).toBeVisible()
      await expect(page.getByText('jtlehtinen logged in')).not.toBeVisible()
    })
  })

  test.describe('When logged in', () => {
    test.beforeEach(async ({ page }) => {
      await loginWith(page, 'jtlehtinen', 'password')
    })

    test('a blog can be created', async ({ page }) => {
      await createBlog(page, 'E2E testing with Playwright', 'Juha Lehtinen', 'http://example.com')
      await expect(page.getByText('E2E testing with Playwright Juha Lehtinen')).toBeVisible()
    })
  })
})
