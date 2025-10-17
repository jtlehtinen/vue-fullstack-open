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

    await request.post('/api/users', {
      data: {
        name: 'Pekka Puu',
        username: 'pekkis',
        password: 'pa55word'
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

    test('a blog can be liked', async ({ page }) => {
      await createBlog(page, 'E2E testing with Playwright', 'Juha Lehtinen', 'http://example.com')
      await page.getByRole('button', { name: 'View' }).click()
      await page.getByRole('button', { name: 'Like' }).click()
    })

    test('a blog can be deleted', async ({ page }) => {
      await createBlog(page, 'E2E testing with Playwright', 'Juha Lehtinen', 'http://example.com')
      await page.getByRole('button', { name: 'View' }).click()

      page.once('dialog', async (dialog) => {
        expect(dialog.type()).toBe('confirm')
        await dialog.accept()
      })

      await page.getByRole('button', { name: 'Remove' }).click()
      await expect(page.getByText('E2E testing with Playwright Juha Lehtinen')).not.toBeVisible()
    })
  })

  test('a blog cannot be deleted when not the creator', async ({ page, request }) => {
    await loginWith(page, 'pekkis', 'pa55word')
    await createBlog(page, 'Other User Blog', 'Other User', 'http://example.com')
    await page.getByRole('button', { name: 'Logout' }).click()

    await loginWith(page, 'jtlehtinen', 'password')
    await page.getByRole('button', { name: 'View' }).click()
    await expect(page.getByRole('button', { name: 'Remove' })).not.toBeVisible()
  })

  test('blogs ordered based on likes', async ({ page, request }) => {
    await loginWith(page, 'jtlehtinen', 'password')

    await createBlog(page, 'Blog One', 'Author One', 'http://one.com')
    await createBlog(page, 'Blog Two', 'Author Two', 'http://two.com')
    await createBlog(page, 'Blog Three', 'Author Three', 'http://three.com')

    await page.getByText('Blog Two Author Two').locator('..').getByRole('button', { name: 'View' }).click()
    const blogTwo = page.getByText('Blog Two Author Two').locator('..')
    await blogTwo.getByRole('button', { name: 'Like' }).click()
    await expect(blogTwo.getByTestId('blog-likes')).toHaveText(/Likes: 1/)
    await blogTwo.getByRole('button', { name: 'Like' }).click()
    await expect(blogTwo.getByTestId('blog-likes')).toHaveText(/Likes: 2/)

    await page.getByText('Blog Three Author Three').locator('..').getByRole('button', { name: 'View' }).click()
    const blogThree = page.getByText('Blog Three Author Three').locator('..')
    await blogThree.getByRole('button', { name: 'Like' }).click()
    await expect(blogThree.getByTestId('blog-likes')).toHaveText(/Likes: 1/)

    const blogTitles = await page.locator('[data-testid="blog-title-author"]').allTextContents()

    expect(blogTitles.length).toBe(3)
    expect(blogTitles).toBe([
      'Blog Two Author Two',
      'Blog Three Author Three',
      'Blog One Author One'
    ])
  })
})
