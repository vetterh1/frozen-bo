import express from 'express'
// var serveIndex = require('serve-index')
import path from 'path';
import cors from 'cors'
import compression from 'compression'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import { errorHandler as queryErrorHandler } from 'querymen'
import { errorHandler as bodyErrorHandler } from 'bodymen'
import { env, staticFolders } from '../../config'

export default (apiRoot, routes) => {
  const app = express()

  /* istanbul ignore next */
  if (env === 'production' || env === 'development') {
    app.use(cors())
    app.use(compression())
    app.use(morgan('dev'))
  }

  app.use(bodyParser.json({ limit: '10mb' })); // Mandatory to get body in post requests!
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  // app.use(bodyParser.urlencoded({ extended: false }))
  // app.use(bodyParser.json())


  app.use(apiRoot, routes)


  // Serve static assets (pictures,...)
  const folderStaticAbsolute = path.join(__dirname, staticFolders.relativePaths.fromExpress, staticFolders.static);
  console.info(`Public (static) files should be here: ${folderStaticAbsolute}`);
  // app.use('/public', express.static(folderStaticAbsolute), serveIndex(folderStaticAbsolute, {'icons': true}));
  app.use('/static', express.static(folderStaticAbsolute));




  app.use(queryErrorHandler())
  app.use(bodyErrorHandler())

  return app
}
