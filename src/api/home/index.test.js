import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Home } from '.'
// import { itemCharacteristics } from '../../utils/itemCharacteristics'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, home

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  home = await Home.create({name: 'test', label: 'test', id2: 'testId2'})
})

test('POST /homes 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, name: 'test2', label: 'test2', id2: 'testId22' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test2')
  expect(body.label).toEqual('test2')
  expect(body.id2).toEqual('testId22')
})

test('POST /homes 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /homes 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /homes 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /homes/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${home.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(home.id)
})

test('GET /homes/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${home.id}`)
  expect(status).toBe(401)
})

test('GET /homes/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})




test('GET /homes/id2/:id2 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/id2/${home.id2}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id2).toEqual(home.id2)
})

test('GET /homes/id2/:id2 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/id2/${home.id2}`)
  expect(status).toBe(401)
})

test('GET /homes/id2/:id2 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/id2/testId22222')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})




test('PUT /homes/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${home.id}`)
    .send({ access_token: userSession, name: 'test2', label: 'test2', id2: 'testId22' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(home.id)
  expect(body.name).toEqual('test2')
  expect(body.label).toEqual('test2')
  expect(body.id2).toEqual('testId22')
})

test('PUT /homes/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${home.id}`)
  expect(status).toBe(401)
})

test('PUT /homes/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: userSession, name: 'test2', label: 'test2', id2: 'test2' })
  expect(status).toBe(404)
})

test('DELETE /homes/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${home.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /homes/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${home.id}`)
  expect(status).toBe(401)
})

test('DELETE /homes/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})
