import { mount } from '@vue/test-utils'
import { describe, test, expect } from 'vitest'
import BlogForm from './blog-form.vue'

describe("BlogForm component", () => {
  test('should emit event with correct blog details when form is submitted', async () => {
    const expectAuthor = 'Alice Johnson'
    const expectTitle = 'React Hooks in Depth'
    const expectUrl = 'https://example.com/react-hooks'

    const wrapper = mount(BlogForm)

    const author = wrapper.get('[data-testid="blog-form-author"]')
    const title = wrapper.get('[data-testid="blog-form-title"]')
    const url = wrapper.get('[data-testid="blog-form-url"]')

    const submitButton = wrapper.get('[data-testid="blog-form-submit-btn"]')

    author.setValue(expectAuthor)
    title.setValue(expectTitle)
    url.setValue(expectUrl)

    await submitButton.trigger('submit')

    const emittedEvents = wrapper.emitted('submit')
    expect(emittedEvents).toHaveLength(1)

    const [gotTitle, gotAuthor, gotUrl] = emittedEvents[0]
    expect(gotTitle).toBe(expectTitle)
    expect(gotAuthor).toBe(expectAuthor)
    expect(gotUrl).toBe(expectUrl)
  })
})
