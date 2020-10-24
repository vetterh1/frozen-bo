import request from "supertest";
import { apiRoot } from "../../config";
import { signSync } from "../../services/jwt";
import express from "../../services/express";
import { User } from "../user";

import routes from ".";

const app = () => express(apiRoot, routes);

let user,
  userSession,
  existingSizeOfExistingImage,
  randSizeOfExistingImage,
  existingImage,
  unknownImage;

beforeEach(async () => {
  user = await User.create({
    email: "a@a.com",
    password: "123456",
  });
  userSession = signSync(user.id);

  existingImage = "5d46ce974824202783ae184f-picture-1564921556706.jpg";
  unknownImage = "unknownimage.jpg?type=item&width=230&height=230";

  // Note: URL looks like this: /custom-size-image/5d46ce974824202783ae184f-picture-1564921556706.jpg?type=item&width=230&height=236
  existingSizeOfExistingImage = existingImage + "?type=item&width=230&height=230";
  randSizeOfExistingImage = existingImage + `?type=item&width=${Math.floor(Math.random() * 1000)}&height=${Math.floor(Math.random() * 1000)}`;
});




//
// GET
//


test("GET /custom-size-image/existingSizeOfExistingImage 200 (user)", async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${existingSizeOfExistingImage}`)
    .query({ access_token: userSession });
  expect(status).toBe(200);
});

test("GET /custom-size-image/randSizeOfExistingImage 200 (user)", async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${randSizeOfExistingImage}`)
    .query({ access_token: userSession });
  expect(status).toBe(200);
});

test("GET /custom-size-image/... no access token 401", async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${existingImage}`);
  expect(status).toBe(401);
});

test("GET /custom-size-image/unknownImage 404 (user)", async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${unknownImage}`)
    .query({ access_token: userSession });
  expect(status).toBe(404);
});







//
// DELETE custom size images. always returns 204
//

test("DELETE /custom-size-image/existingImage 204 (user)", async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${existingImage}`)
    .query({ access_token: userSession });
  expect(status).toBe(204);
});

test("DELETE /custom-size-image/unknownImage 204 (user)", async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${existingImage}`)
    .query({ access_token: userSession });
  expect(status).toBe(204);
});
