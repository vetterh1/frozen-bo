import http from 'http'
import { env, mongo, port, ip, apiRoot } from './config'
import { mongoose, options } from './services/mongoose'
import express from './services/express'
import api from './api'

import fs from 'fs';
import path from 'path';



//
// ---------------------  CREATE FOLDERS IN DON'T EXIST ---------------------
//


// Create dir recursively if it does not exist!
function mkdirReccursive(completePath) {
  const separator = completePath.indexOf('/') !== -1 ? '/' : '\\';
  completePath.split(separator).forEach((dir, index, splits) => {
    const parent = splits.slice(0, index).join('/');
    const dirPath = path.resolve(parent, dir);
    if (!fs.existsSync(dirPath)) {
      console.info(`created folder: ${dirPath}`);
      fs.mkdirSync(dirPath);
    }
  });
}

// Items Pictures
const folderPicturesItems = path.join(__dirname, '..', '/static/pictures/items');
console.info(`Folder pictures items: ${folderPicturesItems}`);
mkdirReccursive(folderPicturesItems);

// Items Pictures Thumbnails
const folderThumbnailsItems = path.join(__dirname, '..', '/static/thumbnails/items');
console.info(`Folder thumbnails Items: ${folderThumbnailsItems}`);
mkdirReccursive(folderThumbnailsItems);





//
// ---------------------  Start express & mongo connect ---------------------
//



const app = express(apiRoot, api)
const server = http.createServer(app)

mongoose.connect(mongo.uri, options)
mongoose.Promise = Promise

setImmediate(() => {
  server.listen(port, ip, () => {
    console.log('Express server listening on http://%s:%d, in %s mode', ip, port, env)
    console.log('(mongo db: %s)', mongo.uri)
  })
})

export default app
