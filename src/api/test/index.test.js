import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Test } from '.'

const app = () => express(apiRoot, routes)

let test

beforeEach(async () => {
  test = await Test.create({})
})

test('GET /test 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})
