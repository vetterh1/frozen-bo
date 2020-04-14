import request from "supertest";
import { apiRoot } from "../../config";
import { signSync } from "../../services/jwt";
import express from "../../services/express";
import { User } from "../user";
import { Home } from "../home";
import Item from "./model";
import routes from ".";

const app = () => express(apiRoot, routes);

const code = "T1234";

let home,
  otherHome,
  user,
  userSession,
  anotherSession,
  anotherSessionOtherHome,
  item;

beforeEach(async () => {
  home = await Home.create({ name: "home1", label: "label home 1" });
  otherHome = await Home.create({ name: "home2", label: "label home 2" });
  // Next Vegetable id should be V0123 (V + homeOrder + nextIds)
  user = await User.create({
    email: "a@a.com",
    password: "123456",
    home: home.id2,
    homeOrder: 0,
    nextIds: { V: "123" }
  });
  const anotherUser = await User.create({
    email: "b@b.com",
    password: "123456",
    home: home.id2
  });
  const anotherUserOtherHome = await User.create({
    email: "c@b.com",
    password: "123456",
    home: otherHome.id2
  });
  userSession = signSync(user.id);
  anotherSession = signSync(anotherUser.id);
  anotherSessionOtherHome = signSync(anotherUserOtherHome.id);
  item = await Item.create({
    user: user.id,
    home: home.id2,
    code,
    description: "test",
    category: "V",
    details: "test1,test2",
    size: 6,
    pictureName: "picture-name",
    thumbnailName: "thumbnail-name",
  });
});

//
// CREATE
//

test("POST /items 201 (user) - existing category", async () => {
  const now = new Date();
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({
      access_token: userSession,
      category: "V",
      details: "test1,test2",
      container: "test",
      color: "test",
      size: "4",
      freezer: "test",
      location: "test",
      description: "test",
      expirationDate: now.getTime(),
      expirationInMonth: "6"
    });
  expect(status).toBe(201);
  expect(typeof body).toEqual("object");
  expect(body.code).toMatch(/V0/);
  expect(body.code).toEqual("V0123");
  expect(body.category).toEqual("V");
  expect(body.details).toEqual("test1,test2");
  expect(body.container).toEqual("test");
  expect(body.color).toEqual("test");
  expect(body.size).toEqual(4);
  expect(body.freezer).toEqual("test");
  expect(body.location).toEqual("test");
  expect(body.description).toEqual("test");
  expect(body.expirationInMonth).toEqual(6);
  expect(body.expirationDate).toEqual(now.getTime());
  expect(body.user).toEqual(user.id);
});

test("POST /items 201 (user) - new category", async () => {
  const now = new Date();
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({
      access_token: userSession,
      category: "N",
      details: "test1,test2",
      container: "test",
      color: "test",
      size: "4",
      freezer: "test",
      location: "test",
      description: "test",
      expirationDate: now,
      expirationInMonth: "6"
    });
  expect(status).toBe(201);
  expect(typeof body).toEqual("object");
  expect(body.code).toMatch(/N0/);
  expect(body.code).toEqual("N00");
  expect(body.category).toEqual("N");
});

test("POST /items 401", async () => {
  const { status } = await request(app()).post(`${apiRoot}`);
  expect(status).toBe(401);
});

//
// RETREIVE ALL
//

test("GET /items 200 (user)", async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession });
  expect(status).toBe(200);
  expect(Array.isArray(body)).toBe(true);
  expect(body[0].user).toEqual(user.id);
});

test("GET /items 401", async () => {
  const { status } = await request(app()).get(`${apiRoot}`);
  expect(status).toBe(401);
});

//
// RETREIVE ONE
//

test("GET /items/:id 200 (user)", async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${item.id}`)
    .query({ access_token: userSession });
  expect(status).toBe(200);
  expect(typeof body).toEqual("object");
  expect(body.id).toEqual(item.id);
  expect(body.user).toEqual(user.id);
});

test("GET /items/:id 401", async () => {
  const { status } = await request(app()).get(`${apiRoot}/${item.id}`);
  expect(status).toBe(401);
});

test("GET /items/:id 404 (user)", async () => {
  const { status } = await request(app())
    .get(apiRoot + "/123456789098765432123456")
    .query({ access_token: userSession });
  expect(status).toBe(404);
});

//
// UPDATE
//

test("PUT /items/:id 200 (user, all items changed)", async () => {
  const now = new Date();
  const { status, body } = await request(app())
    .put(`${apiRoot}/${item.id}`)
    .send({
      access_token: userSession,
      category: "test",
      details: "test1,test2",
      container: "test",
      color: "test",
      size: "4",
      freezer: "test",
      location: "test",
      description: "test",
      expirationDate: now.getTime(),
      expirationInMonth: "6"
    });
  expect(status).toBe(200);
  expect(typeof body).toEqual("object");
  expect(body.id).toEqual(item.id);
  expect(body.category).toEqual("test");
  expect(body.details).toEqual("test1,test2");
  expect(body.container).toEqual("test");
  expect(body.color).toEqual("test");
  expect(body.size).toEqual(4);
  expect(body.freezer).toEqual("test");
  expect(body.location).toEqual("test");
  expect(body.description).toEqual("test");
  expect(body.expirationInMonth).toEqual(6);
  expect(body.expirationDate).toEqual(now.getTime());
  expect(body.user).toEqual(user.id);
});

test("PUT /items/:id 200 (user, only date changed)", async () => {
  const now = new Date();
  const { status, body } = await request(app())
    .put(`${apiRoot}/${item.id}`)
    .send({ access_token: userSession, expirationDate: now.getTime() });
  expect(status).toBe(200);
  expect(typeof body).toEqual("object");
  expect(body.category).toEqual("V");
  expect(body.details).toEqual("test1,test2");
  expect(body.expirationDate).toEqual(now.getTime());
  // console.log('body when ony date changes: ', body)
});

test("PUT /items/:id 200 (user) - another user, same home", async () => {
  const d = new Date();
  const { status } = await request(app())
    .put(`${apiRoot}/${item.id}`)
    .send({
      access_token: anotherSession,
      code: "test",
      category: "test",
      details: "test1,test2",
      container: "test",
      color: "test",
      size: "4",
      freezer: "test",
      location: "test",
      description: "test",
      expirationDate: d.getTime(),
      expirationInMonth: "6"
    });
  expect(status).toBe(200);
});

test("PUT /items/:id 401 (user) - another user, other home", async () => {
  const d = new Date();
  const { status } = await request(app())
    .put(`${apiRoot}/${item.id}`)
    .send({
      access_token: anotherSessionOtherHome,
      code: "test",
      category: "test",
      details: "test1,test2",
      container: "test",
      color: "test",
      size: "4",
      freezer: "test",
      location: "test",
      description: "test",
      expirationDate: d.getTime(),
      expirationInMonth: "6"
    });
  expect(status).toBe(401);
});

test("PUT /items/:id 401", async () => {
  const { status } = await request(app()).put(`${apiRoot}/${item.id}`);
  expect(status).toBe(401);
});

test("PUT /items/:id 404 (user)", async () => {
  const d = new Date();
  const { status } = await request(app())
    .put(apiRoot + "/123456789098765432123456")
    .send({
      access_token: anotherSession,
      code: "test",
      category: "test",
      details: "test1,test2",
      container: "test",
      color: "test",
      size: "4",
      freezer: "test",
      location: "test",
      description: "test",
      expirationDate: d.getTime(),
      expirationInMonth: "6"
    });
  expect(status).toBe(404);
});

//
// DUPLICATE
//

test("PUT /items/:id/duplicate 200 (user)", async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${item.id}/duplicate`)
    .send({ access_token: userSession, duplicated_picture_name: "new-picture", duplicated_thumbnail_name: "new-thumbnail" });

  // console.info('test - original item: ', item);
  // console.info('test - duplicated item: ', body);
  expect(status).toBe(201);
  expect(typeof body).toEqual("object");
  expect(body.code).toEqual("V0123");
  expect(body.id).not.toEqual(item.id);
  expect(body.category).toEqual(item.category);
  expect(body.details).toEqual(item.details);
  expect(body.size).toEqual(item.size);
  expect(body.description).toEqual(item.description);
  expect(body.home).toEqual(item.home);
  expect(body.user).toEqual(user.id);
});

//
// REMOVE
//

test("POST /items/remove/:id 200 (same home, remove all)", async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}/remove/${item.id}`)
    .send({ access_token: userSession });
  expect(status).toBe(200);
  expect(body.size).toBe(6);
  expect(body.removed).toBe(true);
});

test("POST /items/remove/:id 200 (same home, remove part)", async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}/remove/${item.id}`)
    .send({ access_token: userSession, size: "4" });
  expect(status).toBe(200);
  expect(body.removed).toBe(false);
  expect(body.size).toBe(4);
});

test("POST /items/remove/:id 200 (user) - another user, same home", async () => {
  const { status } = await request(app())
    .post(`${apiRoot}/remove/${item.id}`)
    .send({ access_token: anotherSession });
  expect(status).toBe(200);
});

test("POST /items/remove/:id 401 (user) - another user, other home", async () => {
  const { status } = await request(app())
    .post(`${apiRoot}/remove/${item.id}`)
    .send({ access_token: anotherSessionOtherHome });
  expect(status).toBe(401);
});

test("POST /items/remove/:id 401", async () => {
  const { status } = await request(app()).post(`${apiRoot}/remove/${item.id}`);
  expect(status).toBe(401);
});

test("POST /items/remove/:id 404 (user)", async () => {
  const { status } = await request(app())
    .post(apiRoot + "/remove/123456789098765432123456")
    .query({ access_token: anotherSession });
  expect(status).toBe(404);
});

//
// DELETE
//

test("DELETE /items/:id 204 (user)", async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${item.id}`)
    .query({ access_token: userSession });
  expect(status).toBe(204);
});

test("DELETE /items/:id 401 (user) - another user", async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${item.id}`)
    .send({ access_token: anotherSession });
  expect(status).toBe(401);
});

test("DELETE /items/:id 401", async () => {
  const { status } = await request(app()).delete(`${apiRoot}/${item.id}`);
  expect(status).toBe(401);
});

test("DELETE /items/:id 404 (user)", async () => {
  const { status } = await request(app())
    .delete(apiRoot + "/123456789098765432123456")
    .query({ access_token: anotherSession });
  expect(status).toBe(404);
});
