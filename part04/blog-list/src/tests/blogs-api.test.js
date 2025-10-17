import mongoose from 'mongoose'
import supertest from 'supertest'
import { afterAll, beforeAll, beforeEach, describe, expect, test } from 'vitest'
import { createApp } from '../app.js'
import { Blog } from '../models/index.js'
import { blogs as initialBlogs } from './data/blogs.js'

let api = null

beforeAll(async () => {
  const app = await createApp()
  api = supertest(app)
})

afterAll(async () => {
  await mongoose.connection.close()
})

describe('GET /api/blogs', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
  })

  test('should return all blogs as JSON', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(initialBlogs.length)
  })

  test('should return blogs with an id property', async () => {
    const response = await api.get('/api/blogs')

    response.body.forEach(blog => expect(blog.id).toBeDefined())
  })
})

describe('POST /api/blogs', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
  })

  test('should successfully create a new blog', async () => {
    const newBlog = {
      title: 'New Blog',
      author: 'Author',
      url: 'http://example.com',
      likes: 5
    }

    await api.post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await Blog.find({})
    expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain('New Blog')
  })

  test('should default likes to 0', async () => {
    const newBlog = {
      title: 'No Likes Blog',
      author: 'Author',
      url: 'http://nolikes.com'
    }

    const response = await api.post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(0)
  })

  test('should fail with 400 if title missing', async () => {
    const newBlog = {
      author: 'Author',
      url: 'http://exmaple.com'
    }

    await api.post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

  test('should fail with 400 if url missing', async () => {
    const newBlog = {
      author: 'Author',
      title: 'Title'
    }

    await api.post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
})

describe('DELETE /api/blogs/:id', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
  })

  test('should delete a blog by id', async () => {
    const blogsAtStart = await Blog.find({})
    const blogToDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id.toString()}`).expect(204)

    const blogsAtEnd = await Blog.find({})
    const blogIdsAtEnd = blogsAtEnd.map(b => b.id.toString())

    expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1)
    expect(blogIdsAtEnd).not.toContain(blogToDelete.id.toString())
  })
})

describe('PUT /api/blogs/:id', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
  })

  test('should update the number of likes for a blog', async () => {
    const blogsAtStart = await Blog.find({})
    const blogToUpdate = blogsAtStart[0]

    const updatedBlog = { ...blogToUpdate.toJSON(), likes: blogToUpdate.likes + 1 }

    const response = await api.put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(blogToUpdate.likes + 1)
  })
})
