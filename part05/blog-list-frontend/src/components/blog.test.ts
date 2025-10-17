import { describe, test, expect } from 'vitest'
import Blog from './blog.vue'
import { mount } from '@vue/test-utils'

describe("Blog component", () => {
  test('renders blog title and author initially', () => {
    const blog = {
      title: 'React Hooks in Depth',
      author: 'Alice Johnson',
      url: 'https://example.com/react-hooks',
      likes: 15,
    }

    const wrapper = mount(Blog, {
      props: {
        blog
      }
    })

    const titleAuthor = wrapper.get('[data-testid="blog-title-author"]')
    expect(titleAuthor.text()).toContain('React Hooks in Depth')
    expect(titleAuthor.text()).toContain('Alice Johnson')

    const url = wrapper.find('[data-testid="blog-url"]')
    expect(url.exists()).toBe(false)

    const likes = wrapper.find('[data-testid="blog-likes"]')
    expect(likes.exists()).toBe(false)
  })
})
