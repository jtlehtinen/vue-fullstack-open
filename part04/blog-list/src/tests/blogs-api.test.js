import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'
import supertest from 'supertest'
import { afterAll, beforeAll, beforeEach, describe, expect, test } from 'vitest'
import { createApp } from '../app.js'
import { Blog, User } from '../models/index.js'
import { blogs as initialBlogs } from './data/blogs.js'

const username = 'testuser'
const password = 'testpassword'

let api = null

async function loginHelper(api, username, password) {
  const response = await api
    .post('/api/login')
    .send({ username, password })
    .expect(200)

  return response.body.token
}

async function setup() {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash(password, 10)
  const user = await User.create({ username, passwordHash })

  const blogsWithUser = initialBlogs.map(blog => ({
    ...blog,
    user: user._id
  }))

  await Blog.insertMany(blogsWithUser)
}

beforeAll(async () => {
  const app = await createApp()
  api = supertest(app)
})

afterAll(async () => {
  await mongoose.connection.close()
})

describe('GET /api/blogs', () => {
  beforeEach(async () => {
    await setup()
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
    await setup()
  })

  test('should successfully create a new blog', async () => {
    const token = await loginHelper(api, username, password)

    const newBlog = {
      title: 'Title',
      author: 'Author',
      url: 'https://example.com',
      likes: 5
    }

    await api.post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await Blog.find({})
    expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain('Title')
  })

  test('should default likes to 0', async () => {
    const token = await loginHelper(api, username, password)

    const newBlog = {
      title: 'Title',
      author: 'Author',
      url: 'https://example.com'
    }

    const response = await api.post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(0)
  })

  test('should fail with 400 if title missing', async () => {
    const token = await loginHelper(api, username, password)

    const newBlog = {
      author: 'Author',
      url: 'https://exmaple.com'
    }

    await api.post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)
  })

  test('should fail with 400 if url missing', async () => {
    const token = await loginHelper(api, username, password)

    const newBlog = {
      title: 'Title',
      author: 'Author'
    }

    await api.post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)
  })

  test('should fail with 401 if not authenticated', async () => {
    const newBlog = {
      title: 'Title',
      author: 'Author',
      url: 'https://example.com',
    }

    await api.post('/api/blogs')
      .send(newBlog)
      .expect(401)
  })
})

describe('DELETE /api/blogs/:id', () => {
  beforeEach(async () => {
    await setup()
  })

  test('should delete a blog by id', async () => {
    const token = await loginHelper(api, username, password)

    const blogsAtStart = await Blog.find({})
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id.toString()}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await Blog.find({})
    const blogIdsAtEnd = blogsAtEnd.map(b => b.id.toString())

    expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1)
    expect(blogIdsAtEnd).not.toContain(blogToDelete.id.toString())
  })
})

describe('PUT /api/blogs/:id', () => {
  beforeEach(async () => {
    await setup()
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
