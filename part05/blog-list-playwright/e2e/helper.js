export async function loginWith(page, username, password) {
  await page.getByLabel('username').fill(username)
  await page.getByLabel('password').fill(password)
  await page.getByRole('button', { name: 'Login' }).click()
}

export async function createBlog(page, title, author, url) {
  await page.getByRole('button', { name: 'Create new blog' }).click()
  await page.getByTestId('blog-form-title').fill(title)
  await page.getByTestId('blog-form-author').fill(author)
  await page.getByTestId('blog-form-url').fill(url)
  await page.getByRole('button', { name: 'Create' }).click()
  await page.getByText(`${title} ${author}`).waitFor()
}
