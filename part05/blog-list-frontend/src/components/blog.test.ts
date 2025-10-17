import { mount } from '@vue/test-utils'
import { describe, test, expect } from 'vitest'
import Blog from './blog.vue'

describe("Blog component", () => {
  const blog = {
    title: 'React Hooks in Depth',
    author: 'Alice Johnson',
    url: 'https://example.com/react-hooks',
    likes: 15,
    user: {
      username: 'juha',
      name: 'Juha Tester',
      id: '1'
    }
  }

  test('should initially render blog title and author', () => {
    const wrapper = mount(Blog, {
      props: { blog }
    })

    const titleAuthor = wrapper.get('[data-testid="blog-title-author"]')
    expect(titleAuthor.text()).toContain('React Hooks in Depth')
    expect(titleAuthor.text()).toContain('Alice Johnson')

    const url = wrapper.find('[data-testid="blog-url"]')
    expect(url.exists()).toBe(false)

    const likes = wrapper.find('[data-testid="blog-likes"]')
    expect(likes.exists()).toBe(false)
  })

  test('should render blog url and likes when view clicked', async () => {
    const wrapper = mount(Blog, {
      props: { blog }
    })

    const viewButton = wrapper.get('[data-testid="blog-view-btn"]')
    await viewButton.trigger('click')

    const url = wrapper.find('[data-testid="blog-url"]')
    expect(url.exists()).toBe(true)

    const likes = wrapper.find('[data-testid="blog-likes"]')
    expect(likes.exists()).toBe(true)
  })

  test('should emit event when like button clicked', async () => {
    const wrapper = mount(Blog, {
      props: { blog }
    })

    const viewButton = wrapper.get('[data-testid="blog-view-btn"]')
    await viewButton.trigger('click')

    const likeButton = wrapper.get('[data-testid="blog-like-btn"]')
    await likeButton.trigger('click')
    await likeButton.trigger('click')

    expect(wrapper.emitted()).toHaveProperty('like')
    expect(wrapper.emitted('like').length).toBe(2)
  })
})
