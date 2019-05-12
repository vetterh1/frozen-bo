import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Test2 } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, test2

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  test2 = await Test2.create({ user })
})

test('POST /test2 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, name: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('POST /test2 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /test2 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
  expect(typeof body[0].user).toEqual('object')
})

test('GET /test2 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /test2/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${test2.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(test2.id)
  expect(typeof body.user).toEqual('object')
})

test('GET /test2/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${test2.id}`)
  expect(status).toBe(401)
})

test('GET /test2/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /test2/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${test2.id}`)
    .send({ access_token: userSession, name: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(test2.id)
  expect(body.name).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('PUT /test2/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${test2.id}`)
    .send({ access_token: anotherSession, name: 'test' })
  expect(status).toBe(401)
})

test('PUT /test2/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${test2.id}`)
  expect(status).toBe(401)
})

test('PUT /test2/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, name: 'test' })
  expect(status).toBe(404)
})

test('DELETE /test2/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${test2.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /test2/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${test2.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /test2/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${test2.id}`)
  expect(status).toBe(401)
})

test('DELETE /test2/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
