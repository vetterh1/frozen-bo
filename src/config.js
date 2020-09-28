/* eslint-disable no-unused-vars */
import path from 'path'
import merge from 'lodash/merge'

/* istanbul ignore next */
const requireProcessEnv = (name) => {
  if (!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable')
  }
  return process.env[name]
}

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv-safe')
  // dotenv.load({
  //   path: path.join(__dirname, '../.env'),
  //   sample: path.join(__dirname, '../.env.example')
  // })
  dotenv.config();
}

const config = {
  all: {
    env: process.env.NODE_ENV || 'development',
    slow_mode: process.env.SLOW_MODE || undefined,
    root: path.join(__dirname, '..'),
    port: process.env.PORT || 9000,
    ip: process.env.IP || '0.0.0.0',
    apiRoot: process.env.API_ROOT || '/',
    defaultEmail: 'no-reply@frozen-bo.com',
    sendgridKey: requireProcessEnv('SENDGRID_KEY'),
    masterKey: requireProcessEnv('MASTER_KEY'),
    jwtSecret: requireProcessEnv('JWT_SECRET'),
    mongo: {
      options: {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true,
        // db: {  does not work with new mongoose version :/
        //   safe: true,
        // }
      },   
    },
    staticFolders: {
      static: '/static',
      pictures: '/static/pictures',
      // thumbnails: '/static/thumbnails',
      relativePaths: {
        fromController: '../../..',
        fromExpress: '../../..',
        fromApp: '..',
        fromUtil: '..',
      }
    }
  },
  test: { },
  development: {
    mongo: {
      uri: 'mongodb://localhost/frozen-dev',
      uriLocalProtected: 'mongodb://frozen:gem@localhost/frozen-dev',
      uriLocal: 'mongodb://localhost/frozen-dev',
      uriRemote: 'mongodb://frozen:gem@51.254.221.25:27017/frozen-dev',
      options: {
        debug: true
      },
      ssl: {
        sslMode : false,
        sslKeyPath : "/Users/lav/ssl/mongodb.pem",
        sslCertPath : "/Users/lav/ssl/mongodb-cert.crt",
   
      }      
    }
  },
  production: {
    ip: process.env.IP || undefined,
    port: process.env.PORT || 8065,
    mongo: {
      uri: 'mongodb://frozen:gem@51.254.221.25:27017/frozen',
      uriOld: process.env.MONGODB_URI || 'mongodb://localhost/frozen',
      ssl: {
        sslMode : true,
        sslKeyPath : "/etc/ssl/mongodb.pem",
        sslCertPath : "/etc/ssl/mongodb-cert.crt",      
      }
    }
  }
}

module.exports = merge(config.all, config[config.all.env])
export default module.exports
