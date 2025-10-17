import mongoose from 'mongoose'
import supertest from 'supertest'
import { afterAll, beforeAll, beforeEach, describe, expect, test } from 'vitest'
import { createApp } from '../app.js'
import { User } from '../models/index.js'

let api = null

beforeAll(async () => {
  const app = await createApp()
  api = supertest(app)
})

afterAll(async () => {
  await mongoose.connection.close()
})

describe('POST /api/users', () => {
  beforeEach(async () => {
    await User.deleteMany({})
  })

  test('should fail with 400 when username is too short', async () => {
    const newUser = {
      username: 'ab',
      password: 'valid-password',
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(response.body.error).toContain('username must be at least 3 characters long')
  })

  test('should fail with 400 when password is too short', async () => {
    const newUser = {
      username: 'valid-username',
      password: 'ab',
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(response.body.error).toContain('password must be at least 3 characters long')
  })
})
