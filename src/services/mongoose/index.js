import Promise from "bluebird";
import mongoose from "mongoose";
import { mongo } from "../../config";

//
// ---------------------  INIT DB  ---------------------
//

const options = {
  autoIndex: false, // Don't build indexes
  keepAlive: 1,
  connectTimeoutMS: 30000,
  bufferCommands: false, // Disable buffering of mongoose commands
};

mongoose.Promise = Promise;
/* istanbul ignore next */
mongoose.Types.ObjectId.prototype.view = function () {
  return { id: this.toString() };
};

/* istanbul ignore next */
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error: " + err);
  process.exit(-1);
});

export { mongoose, options };
