import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Container } from '.'
import { defaultCharacteristics } from '../../utils/defaultCharacteristics'

const app = () => express(apiRoot, routes)

let userSession, adminSession, container

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  container = await Container.create({name: 'test', label: 'test', id2: 'test'})
})

test('POST /containers/initWithDefault 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}/initWithDefault`)
    .send({ access_token: adminSession })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.length).toEqual(defaultCharacteristics.containers.length);
  const namesInResults = body.map(item => item.name).sort();
  const namesInDefaults = defaultCharacteristics.containers.map(item => item.name).sort();
  expect(namesInResults).toEqual(namesInDefaults);
})

test('POST /containers 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession, name: 'test', label: 'test', id2: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.label).toEqual('test')
  expect(body.id2).toEqual('test')
})

test('POST /containers 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /containers 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /containers 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /containers 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /containers/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${container.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(container.id)
})

test('GET /containers/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${container.id}`)
  expect(status).toBe(401)
})

test('GET /containers/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /containers/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${container.id}`)
    .send({ access_token: adminSession, name: 'test', label: 'test', id2: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(container.id)
  expect(body.name).toEqual('test')
  expect(body.label).toEqual('test')
  expect(body.id2).toEqual('test')
})

test('PUT /containers/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${container.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /containers/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${container.id}`)
  expect(status).toBe(401)
})

test('PUT /containers/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, name: 'test', label: 'test', id2: 'test' })
  expect(status).toBe(404)
})

test('DELETE /containers/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${container.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /containers/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${container.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /containers/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${container.id}`)
  expect(status).toBe(401)
})

test('DELETE /containers/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
