import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Color } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, color

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  color = await Color.create({})
})

test('POST /colors 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession, name: 'test', label: 'test', parents: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.label).toEqual('test')
  expect(body.parents).toEqual('test')
})

test('POST /colors 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /colors 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /colors 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /colors 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /colors/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${color.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(color.id)
})

test('GET /colors/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${color.id}`)
  expect(status).toBe(401)
})

test('GET /colors/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /colors/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${color.id}`)
    .send({ access_token: adminSession, name: 'test', label: 'test', parents: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(color.id)
  expect(body.name).toEqual('test')
  expect(body.label).toEqual('test')
  expect(body.parents).toEqual('test')
})

test('PUT /colors/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${color.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /colors/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${color.id}`)
  expect(status).toBe(401)
})

test('PUT /colors/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, name: 'test', label: 'test', parents: 'test' })
  expect(status).toBe(404)
})

test('DELETE /colors/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${color.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /colors/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${color.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /colors/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${color.id}`)
  expect(status).toBe(401)
})

test('DELETE /colors/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
