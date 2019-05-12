import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Size } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, size

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  size = await Size.create({})
})

test('POST /sizes 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession, name: 'test', label: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.label).toEqual('test')
})

test('POST /sizes 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /sizes 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /sizes 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /sizes 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /sizes/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${size.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(size.id)
})

test('GET /sizes/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${size.id}`)
  expect(status).toBe(401)
})

test('GET /sizes/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /sizes/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${size.id}`)
    .send({ access_token: adminSession, name: 'test', label: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(size.id)
  expect(body.name).toEqual('test')
  expect(body.label).toEqual('test')
})

test('PUT /sizes/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${size.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /sizes/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${size.id}`)
  expect(status).toBe(401)
})

test('PUT /sizes/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, name: 'test', label: 'test' })
  expect(status).toBe(404)
})

test('DELETE /sizes/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${size.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /sizes/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${size.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /sizes/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${size.id}`)
  expect(status).toBe(401)
})

test('DELETE /sizes/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
