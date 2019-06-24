import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import routes, { User } from '.'
import { Home } from '../home'

const app = () => express(apiRoot, routes)

let user1, user2, home, admin, session1, session2, adminSession

beforeEach(async () => {
  user1 = await User.create({ name: 'user', email: 'a@a.com', password: '123456', language:'en' })
  user2 = await User.create({ name: 'user', email: 'b@b.com', password: '123456' })
  home = await Home.create({name:'homeTest', id2: 'homeId2'})
  admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  session1 = signSync(user1.id)
  session2 = signSync(user2.id)
  adminSession = signSync(admin.id)
})

test('GET /users 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(apiRoot)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /users?page=2&limit=1 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(apiRoot)
    .query({ access_token: adminSession, page: 2, limit: 1 })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
  expect(body.length).toBe(1)
})

test('GET /users?q=user 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(apiRoot)
    .query({ access_token: adminSession, q: 'user' })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
  expect(body.length).toBe(2)
})

test('GET /users?fields=name 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(apiRoot)
    .query({ access_token: adminSession, fields: 'name' })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
  expect(Object.keys(body[0])).toEqual(['id', 'name'])
})

test('GET /users 401 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot)
    .query({ access_token: session1 })
  expect(status).toBe(401)
})

test('GET /users 401', async () => {
  const { status } = await request(app())
    .get(apiRoot)
  expect(status).toBe(401)
})

test('GET /users/me 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(apiRoot + '/me')
    .query({ access_token: session1 })
  expect(status).toBe(200)
  expect(typeof body).toBe('object')
  expect(body.id).toBe(user1.id)
})

test('GET /users/me 401', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/me')
  expect(status).toBe(401)
})

test('GET /users/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${user1.id}`)
  expect(status).toBe(200)
  expect(typeof body).toBe('object')
  expect(body.id).toBe(user1.id)
})

test('GET /users/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('POST /users 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(apiRoot)
    .send({ access_token: masterKey, email: 'd@d.com', password: '123456' })
  expect(status).toBe(201)
  expect(typeof body).toBe('object')
  expect(typeof body.user).toBe('object')
  expect(typeof body.token).toBe('string')
  expect(body.user.email).toBe('d@d.com')
})

test('POST /users 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(apiRoot)
    .send({ access_token: masterKey, email: 'd@d.com', password: '123456', role: 'user' })
  expect(status).toBe(201)
  expect(typeof body).toBe('object')
  expect(typeof body.user).toBe('object')
  expect(typeof body.token).toBe('string')
  expect(body.user.email).toBe('d@d.com')
})

test('POST /users 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(apiRoot)
    .send({ access_token: masterKey, email: 'd@d.com', password: '123456', role: 'admin' })
  expect(status).toBe(201)
  expect(typeof body).toBe('object')
  expect(typeof body.user).toBe('object')
  expect(typeof body.token).toBe('string')
  expect(body.user.email).toBe('d@d.com')
})

test('POST /users 409 (master) - duplicated email', async () => {
  const { status, body } = await request(app())
    .post(apiRoot)
    .send({ access_token: masterKey, email: 'a@a.com', password: '123456' })
  expect(status).toBe(409)
  expect(typeof body).toBe('object')
  expect(body.param).toBe('email')
})

test('POST /users 400 (master) - invalid email', async () => {
  const { status, body } = await request(app())
    .post(apiRoot)
    .send({ access_token: masterKey, email: 'invalid', password: '123456' })
  expect(status).toBe(400)
  expect(typeof body).toBe('object')
  expect(body.param).toBe('email')
})

test('POST /users 400 (master) - missing email', async () => {
  const { status, body } = await request(app())
    .post(apiRoot)
    .send({ access_token: masterKey, password: '123456' })
  expect(status).toBe(400)
  expect(typeof body).toBe('object')
  expect(body.param).toBe('email')
})

test('POST /users 400 (master) - invalid password', async () => {
  const { status, body } = await request(app())
    .post(apiRoot)
    .send({ access_token: masterKey, email: 'd@d.com', password: '123' })
  expect(status).toBe(400)
  expect(typeof body).toBe('object')
  expect(body.param).toBe('password')
})

test('POST /users 400 (master) - missing password', async () => {
  const { status, body } = await request(app())
    .post(apiRoot)
    .send({ access_token: masterKey, email: 'd@d.com' })
  expect(status).toBe(400)
  expect(typeof body).toBe('object')
  expect(body.param).toBe('password')
})

test('POST /users 400 (master) - invalid role', async () => {
  const { status, body } = await request(app())
    .post(apiRoot)
    .send({ access_token: masterKey, email: 'd@d.com', password: '123456', role: 'invalid' })
  expect(status).toBe(400)
  expect(typeof body).toBe('object')
  expect(body.param).toBe('role')
})

test('POST /users 401 (admin)', async () => {
  const { status } = await request(app())
    .post(apiRoot)
    .send({ access_token: adminSession, email: 'd@d.com', password: '123456' })
  expect(status).toBe(401)
})

test('POST /users 401 (user)', async () => {
  const { status } = await request(app())
    .post(apiRoot)
    .send({ access_token: session1, email: 'd@d.com', password: '123456' })
  expect(status).toBe(401)
})

test('POST /users 401', async () => {
  const { status } = await request(app())
    .post(apiRoot)
    .send({ email: 'd@d.com', password: '123456' })
  expect(status).toBe(401)
})

test('PUT /users/me 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(apiRoot + '/me')
    .send({ access_token: session1, name: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toBe('object')
  expect(body.name).toBe('test')
})

test('PUT /users/me 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(apiRoot + '/me')
    .send({ access_token: session1, email: 'test@test.com' })
  expect(status).toBe(200)
  expect(typeof body).toBe('object')
  expect(body.email).toBe('a@a.com')
})

test('PUT /users/me 401', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/me')
    .send({ name: 'test' })
  expect(status).toBe(401)
})

test('PUT /users/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${user1.id}`)
    .send({ access_token: session1, name: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toBe('object')
  expect(body.name).toBe('test')
})

test('PUT /users/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${user1.id}`)
    .send({ access_token: session1, email: 'test@test.com', home: '123456', homeOrder: 1, mapCategoriesNextIds: [{category:'B', nextId:1}, {category:'V', nextId:1}, {category:'S', nextId:3}] })
  expect(status).toBe(200)
  console.log("update user:", body)
  expect(typeof body).toBe('object')
  expect(body.email).toBe('a@a.com')
  expect(body.home).toBe('123456')
  expect(body.homeOrder).toBe(1)
  expect(body.language).toBe('en')
  body.mapCategoriesNextIds.forEach(element => { delete element._id});
  expect(body.mapCategoriesNextIds).toEqual([{category:'B', nextId:1}, {category:'V', nextId:1}, {category:'S', nextId:3}])
})

test('PUT /users/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${user1.id}`)
    .send({ access_token: adminSession, name: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toBe('object')
  expect(body.name).toBe('test')
})

test('PUT /users/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${user1.id}`)
    .send({ access_token: session2, name: 'test' })
  expect(status).toBe(401)
})

test('PUT /users/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${user1.id}`)
    .send({ name: 'test' })
  expect(status).toBe(401)
})

test('PUT /users/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, name: 'test' })
  expect(status).toBe(404)
})

const passwordMatch = async (password, userId) => {
  const user = await User.findById(userId)
  return !!await user.authenticate(password)
}

test('PUT /users/me/password 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(apiRoot + '/me/password')
    .auth('a@a.com', '123456')
    .send({ password: '654321' })
  expect(status).toBe(200)
  expect(typeof body).toBe('object')
  expect(body.email).toBe('a@a.com')
  expect(await passwordMatch('654321', body.id)).toBe(true)
})

test('PUT /users/me/password 400 (user) - invalid password', async () => {
  const { status, body } = await request(app())
    .put(apiRoot + '/me/password')
    .auth('a@a.com', '123456')
    .send({ password: '321' })
  expect(status).toBe(400)
  expect(typeof body).toBe('object')
  expect(body.param).toBe('password')
})

test('PUT /users/me/password 401 (user) - invalid authentication method', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/me/password')
    .send({ access_token: session1, password: '654321' })
  expect(status).toBe(401)
})

test('PUT /users/me/password 401', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/me/password')
    .send({ password: '654321' })
  expect(status).toBe(401)
})

test('PUT /users/:id/password 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${user1.id}/password`)
    .auth('a@a.com', '123456')
    .send({ password: '654321' })
  expect(status).toBe(200)
  expect(typeof body).toBe('object')
  expect(body.email).toBe('a@a.com')
  expect(await passwordMatch('654321', body.id)).toBe(true)
})

test('PUT /users/:id/password 400 (user) - invalid password', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${user1.id}/password`)
    .auth('a@a.com', '123456')
    .send({ password: '321' })
  expect(status).toBe(400)
  expect(typeof body).toBe('object')
  expect(body.param).toBe('password')
})

test('PUT /users/:id/password 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${user1.id}/password`)
    .auth('b@b.com', '123456')
    .send({ password: '654321' })
  expect(status).toBe(401)
})

test('PUT /users/:id/password 401 (user) - invalid authentication method', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${user1.id}/password`)
    .send({ access_token: session1, password: '654321' })
  expect(status).toBe(401)
})

test('PUT /users/:id/password 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${user1.id}/password`)
    .send({ password: '654321' })
  expect(status).toBe(401)
})

test('PUT /users/:id/password 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456/password')
    .auth('a@a.com', '123456')
    .send({ password: '654321' })
  expect(status).toBe(404)
})

test('DELETE /users/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${user1.id}`)
    .send({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /users/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${user1.id}`)
    .send({ access_token: session1 })
  expect(status).toBe(401)
})

test('DELETE /users/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${user1.id}`)
  expect(status).toBe(401)
})

test('DELETE /users/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession })
  expect(status).toBe(404)
})







test('PUT /users/:id/home/join 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${user1.id}/home/join`)
    .send({ access_token: session1, home: home.id2})
  console.log("join home:", body)
  expect(status).toBe(200)
  expect(typeof body).toBe('object')
  expect(body.user.home).toBe(home.id2)
})

test('PUT /users/:id/home/join 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${user1.id}/home/join`)
    .send({ access_token: adminSession, home: home.id2 })
  console.log("join home:", body)
  expect(status).toBe(200)
  expect(typeof body).toBe('object')
})

test('PUT /users/:id/home/join 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${user1.id}/home/join`)
    .send({ access_token: session2, home: home.id2 })
  expect(status).toBe(401)
})

test('PUT /users/:id/home/join 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${user1.id}/home/join`)
    .send({ home: home.id2 })
  expect(status).toBe(401)
})














test('PUT /users/:id/home/new 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${user1.id}/home/new`)
    .send({ access_token: session1, home: home.name})
  console.log("new home:", body)
  expect(status).toBe(200)
  expect(typeof body).toBe('object')
  expect(body.user.home).toBe(body.home.id2)
})

test('PUT /users/:id/home/new 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${user1.id}/home/new`)
    .send({ access_token: adminSession, home: home.name })
  console.log("new home:", body)
  expect(status).toBe(200)
  expect(typeof body).toBe('object')
})

test('PUT /users/:id/home/new 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${user1.id}/home/new`)
    .send({ access_token: session2, home: home.name })
  expect(status).toBe(401)
})

test('PUT /users/:id/home/new 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${user1.id}/home/new`)
    .send({ home: home.name })
  expect(status).toBeGreaterThan(399)
})













test('PUT /users/:id/home/del 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${user1.id}/home/del`)
    .send({ access_token: session1})
  console.log("del home:", body)
  expect(status).toBe(200)
  expect(typeof body).toBe('object')
})

test('PUT /users/:id/home/del 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${user1.id}/home/del`)
    .send({ access_token: adminSession })
  console.log("del home:", body)
  expect(status).toBe(200)
  expect(typeof body).toBe('object')
})

test('PUT /users/:id/home/del 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${user1.id}/home/del`)
    .send({ access_token: session2 })
  expect(status).toBe(401)
})

test('PUT /users/:id/home/del 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${user1.id}/home/del`)
    .send({ home: home.id2 })
  expect(status).toBeGreaterThan(399)
})
