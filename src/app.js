import http from "http";
import { env, mongo, port, ip, apiRoot, foldersPaths } from "./config";
import { mongoose, options } from "./services/mongoose";
import express from "./services/express";
import api from "./api";

import fs from "fs";
import path from "path";

//
// ---------------------  CREATE FOLDERS IN DON'T EXIST ---------------------
//

// Create dir recursively if it does not exist!
function mkdirReccursive(completePath) {
  const separator = completePath.indexOf("/") !== -1 ? "/" : "\\";
  completePath.split(separator).forEach((dir, index, splits) => {
    const parent = splits.slice(0, index).join("/");
    const dirPath = path.resolve(parent, dir);
    if (!fs.existsSync(dirPath)) {
      console.info(`created folder: ${dirPath}`);
      fs.mkdirSync(dirPath);
    }
  });
}

// Items & custom sized Pictures
const folderPicturesItems = path.join(
  __dirname,
  foldersPaths.relativePaths.fromApp,
  foldersPaths.pictures,
  "/items"
);
console.info(`Folder pictures items: ${folderPicturesItems}`);
mkdirReccursive(folderPicturesItems);

const folderCustomSizeImages = path.join(
  __dirname,
  foldersPaths.relativePaths.fromApp,
  foldersPaths.customSizeImages
);
console.info(`Folder custom size images: ${folderCustomSizeImages}`);
mkdirReccursive(folderCustomSizeImages);

//
// ---------------------  Start express & mongo connect ---------------------
//

const app = express(apiRoot, api);
const server = http.createServer(app);

const connectDB = async () => {
  try {
    console.log("(mongo options: %s)", options);
    await mongoose.connect(mongo.uri, options);
    console.log("MongoDB connected!!");
  } catch (err) {
    console.log("Failed to connect to MongoDB", err);
  }
};

connectDB();

setImmediate(() => {
  server.listen(port, ip, () => {
    console.log(
      "Express server listening on http://%s:%d, in %s mode",
      ip,
      port,
      env
    );
    console.log("(mongo db: %s)", mongo.uri);
  });
});

export default app;
