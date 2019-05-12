import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Characteristics } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, characteristics

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  characteristics = await Characteristics.create({})
})

test('POST /characteristics 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession, version: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.version).toEqual('test')
})

test('POST /characteristics 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /characteristics 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /characteristics 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /characteristics 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /characteristics/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${characteristics.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(characteristics.id)
})

test('GET /characteristics/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${characteristics.id}`)
  expect(status).toBe(401)
})

test('GET /characteristics/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /characteristics/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${characteristics.id}`)
    .send({ access_token: adminSession, version: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(characteristics.id)
  expect(body.version).toEqual('test')
})

test('PUT /characteristics/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${characteristics.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /characteristics/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${characteristics.id}`)
  expect(status).toBe(401)
})

test('PUT /characteristics/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, version: 'test' })
  expect(status).toBe(404)
})

test('DELETE /characteristics/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${characteristics.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /characteristics/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${characteristics.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /characteristics/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${characteristics.id}`)
  expect(status).toBe(401)
})

test('DELETE /characteristics/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
