import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Item } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, item

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  item = await Item.create({ user })
})

test('POST /items 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, category: 'test', details: 'test', container: 'test', color: 'test', size: 'test', freezer: 'test', location: 'test', name: 'test', expiration: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.category).toEqual('test')
  expect(body.details).toEqual('test')
  expect(body.container).toEqual('test')
  expect(body.color).toEqual('test')
  expect(body.size).toEqual('test')
  expect(body.freezer).toEqual('test')
  expect(body.location).toEqual('test')
  expect(body.name).toEqual('test')
  expect(body.expiration).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('POST /items 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /items 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
  expect(typeof body[0].user).toEqual('object')
})

test('GET /items 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /items/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${item.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(item.id)
  expect(typeof body.user).toEqual('object')
})

test('GET /items/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${item.id}`)
  expect(status).toBe(401)
})

test('GET /items/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /items/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${item.id}`)
    .send({ access_token: userSession, category: 'test', details: 'test', container: 'test', color: 'test', size: 'test', freezer: 'test', location: 'test', name: 'test', expiration: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(item.id)
  expect(body.category).toEqual('test')
  expect(body.details).toEqual('test')
  expect(body.container).toEqual('test')
  expect(body.color).toEqual('test')
  expect(body.size).toEqual('test')
  expect(body.freezer).toEqual('test')
  expect(body.location).toEqual('test')
  expect(body.name).toEqual('test')
  expect(body.expiration).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('PUT /items/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${item.id}`)
    .send({ access_token: anotherSession, category: 'test', details: 'test', container: 'test', color: 'test', size: 'test', freezer: 'test', location: 'test', name: 'test', expiration: 'test' })
  expect(status).toBe(401)
})

test('PUT /items/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${item.id}`)
  expect(status).toBe(401)
})

test('PUT /items/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, category: 'test', details: 'test', container: 'test', color: 'test', size: 'test', freezer: 'test', location: 'test', name: 'test', expiration: 'test' })
  expect(status).toBe(404)
})

test('DELETE /items/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${item.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /items/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${item.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /items/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${item.id}`)
  expect(status).toBe(401)
})

test('DELETE /items/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
