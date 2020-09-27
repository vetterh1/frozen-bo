import express from 'express'
// var serveIndex = require('serve-index')
import path from 'path';
import cors from 'cors'
import compression from 'compression'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import { errorHandler as queryErrorHandler } from 'querymen'
import { errorHandler as bodyErrorHandler } from 'bodymen'
import { env, slow_mode, staticFolders } from '../../config'
// import binariesRouter from './binariesRouter'

export default (apiRoot, routes) => {
  const app = express()

  /* istanbul ignore next */
  if (env === 'production' || env === 'development') {
    app.use(cors())
    app.use(compression())
    app.use(morgan('dev'))
  }

  // app.use('/bin', binariesRouter);

  

  app.use(bodyParser.json({ limit: '5mb' })); // Mandatory to get body in post requests!
  app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

  // app.use(bodyParser.urlencoded({ extended: false }))
  // app.use(bodyParser.json())


  if(slow_mode) {
    app.use((req,res,next) => {
      setTimeout(next, slow_mode)
    });
  }

  app.use(apiRoot, routes)


  // Serve static assets (pictures,...)
  const folderStaticAbsolute = path.join(__dirname, staticFolders.relativePaths.fromExpress, staticFolders.static);
  if (env === 'production' || env === 'development')
    console.info(`Public (static) files should be here: ${folderStaticAbsolute}`);
  // app.use('/public', express.static(folderStaticAbsolute), serveIndex(folderStaticAbsolute, {'icons': true}));
  app.use('/static', express.static(folderStaticAbsolute));




  app.use(queryErrorHandler())
  app.use(bodyErrorHandler())

  return app
}
