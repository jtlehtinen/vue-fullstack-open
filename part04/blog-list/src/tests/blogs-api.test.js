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
