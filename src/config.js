/* eslint-disable no-unused-vars */
import path from "path";
import merge from "lodash/merge";
import stringifyOnce from "./utils/stringifyOnce";

/* istanbul ignore next */
const requireProcessEnv = (name) => {
  if (!process.env[name]) {
    throw new Error("You must set the " + name + " environment variable");
  }
  return process.env[name];
};

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  const dotenv = require("dotenv-safe");
  // dotenv.load({
  //   path: path.join(__dirname, '../.env'),
  //   sample: path.join(__dirname, '../.env.example')
  // })
  dotenv.config();
}

const config = {
  all: {
    env: process.env.NODE_ENV || "development",
    slow_mode: process.env.SLOW_MODE || undefined,
    root: path.join(__dirname, ".."),
    port: process.env.PORT || 9000,
    ip: process.env.IP || "0.0.0.0",
    apiRoot: process.env.API_ROOT || "",
    defaultEmail: "no-reply@frozen-bo.com",
    sendgridKey: requireProcessEnv("SENDGRID_KEY"),
    masterKey: requireProcessEnv("MASTER_KEY"),
    jwtSecret: requireProcessEnv("JWT_SECRET"),
    foldersPaths: {
      static: "/static",
      pictures: "/static/pictures",
      customSizeImages: "/custom-size-image",
      relativePaths: {
        fromController: "../../..",
        fromExpress: "../../..",
        fromApp: "..",
        fromUtil: "..",
      },
    },
  },
  test: {},
  development: {
    mongo: {
      uri: "mongodb+srv://adminFrozen:frozenPwd@frozengemcluster.1uuuf.mongodb.net/frozen-dev",
      uriAtlas:
        "mongodb+srv://adminFrozen:frozenPwd@frozengemcluster.1uuuf.mongodb.net/frozen-dev?retryWrites=true&w=majority",
      uriLocalProtected: "mongodb://frozen:gem@localhost/frozen-dev",
      uriLocal: "mongodb://localhost/frozen-dev",
      uriRemote: "mongodb://frozen:gem@51.254.221.25:27017/frozen-dev",
    },
  },
  production: {
    ip: process.env.IP || undefined,
    port: process.env.PORT || 8065,
    mongo: {
      uri: "mongodb+srv://adminFrozen:frozenPwd@frozengemcluster.1uuuf.mongodb.net/frozen",
    },
  },
};

module.exports = merge(config.all, config[config.all.env]);
export default module.exports;
