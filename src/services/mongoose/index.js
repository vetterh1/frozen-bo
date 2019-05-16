import Promise from 'bluebird'
import mongoose from 'mongoose'
import { env, mongo } from '../../config'
import fs from 'fs';







//
// ---------------------  INIT DB  ---------------------
//

let sslOptions = {};

/* istanbul ignore next */
if(env !== "test") {

  // SSL to connect to mongo or not
  let sslMode = true;
  if (!mongo.ssl || !mongo.ssl.sslMode) {
    sslMode = false;
    console.error('! Mongo SSL config NOT defined for db. Connection will NOT be secured!');
  } else {
    sslMode = mongo.ssl.sslMode;
    if (sslMode === false) {
      console.error('! Mongo SSL for db is DISABLED. Connection will NOT be secured!');
    } else {
      console.info('Mongo SSL enabled. Connections should be secure :)');
    }
  }

  // If SSL mode, get key & certificate
  let sslKey = '';
  let sslCert = '';
  if (sslMode) {
    // Path to SLL key (used if SSL mode ON)
    let sslKeyPath = '';
    if (!mongo.ssl.sslKeyPath) {
      console.error('! Mongo SSL key path missing for db secure connection!');
    } else {
      sslKeyPath = mongo.ssl.sslKeyPath;
      if (!sslKeyPath || sslKeyPath.length <= 0) {
        console.error('! Mongo SSL key path empty or invalid for db secure connection!');
      } else {
        // Read key content
        sslKey = fs.readFileSync(sslKeyPath);
        if (!sslKey || sslKey.length <= 0) {
          console.error(`! Mongo SSL key missing or invalid file: ${sslKeyPath}`);
        } else {
          console.info(`Mongo SSL key loaded: ${sslKeyPath}`);
        }
      }
    }

    // Path to SLL certificate (used if SSL mode ON)
    let sslCertPath = '';
    if (!mongo.ssl.sslCertPath) {
      console.error('! Mongo SSL certificate path missing for db secure connection!');
    } else {
      sslCertPath = mongo.ssl.sslCertPath;
      if (!sslCertPath || sslCertPath.length <= 0) {
        console.error('! Mongo SSL certificate path empty or invalid for db secure connection!');
      } else {
        // Read certificate content
        sslCert = fs.readFileSync(sslCertPath);
        if (!sslCert || sslCert.length <= 0) {
          console.error(`! Mongo SSL certificate missing or invalid file: ${sslCertPath}`);
        } else {
          console.info(`Mongo SSL certificate loaded: ${sslCertPath}`);
        }
      }
    }
  }

  sslOptions = {
    ssl: sslMode,
    sslValidate: false,
    sslKey,
    sslCert,
  };

} else {
  // console.info('--------- Test mode ---------');
}


const options = {
  autoIndex: false, // Don't build indexes
  keepAlive: 1,
  connectTimeoutMS: 30000,
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 2000,
  bufferCommands: false, // Disable buffering of mongoose commands
  poolSize: 10, // Maintain up to 10 socket connections
  user: 'frozen',
  pass: 'gem',
  ...sslOptions,
};


/* istanbul ignore next */
Object.keys(mongo.options).forEach((key) => {
  mongoose.set(key, mongo.options[key])
})



mongoose.Promise = Promise
/* istanbul ignore next */
mongoose.Types.ObjectId.prototype.view = function () {
  return { id: this.toString() }
}

/* istanbul ignore next */
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error: ' + err)
  process.exit(-1)
})

export { mongoose, options };
