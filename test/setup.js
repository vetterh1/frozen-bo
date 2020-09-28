import { EventEmitter } from 'events'
import MongodbMemoryServer from 'mongodb-memory-server'
import { mongoose } from '../src/services/mongoose'

console.log("--> running test/setup.js")

EventEmitter.defaultMaxListeners = Infinity

// May require additional time for downloading MongoDB binaries
jasmine.DEFAULT_TIMEOUT_INTERVAL = 2000

global.Array = Array
global.Date = Date
global.Function = Function
global.Math = Math
global.Number = Number
global.Object = Object
global.RegExp = RegExp
global.String = String
global.Uint8Array = Uint8Array
global.WeakMap = WeakMap
global.Set = Set
global.Error = Error
global.TypeError = TypeError
global.parseInt = parseInt
global.parseFloat = parseFloat

let mongoServer

beforeAll(async () => {
  mongoServer = new MongodbMemoryServer()
  const mongoUri = await mongoServer.getConnectionString()
  console.log("--> beforeAll - mongoUri=", mongoUri)
  await mongoose.connect(mongoUri)
})

afterAll(async () => {
  console.log("--> afterAll")
  if( mongoose) await mongoose.disconnect()
  await mongoServer.stop()
})

afterEach(async () => {
  const { collections } = mongoose.connection
  const promises = []
  console.log("--> afterEach")
  Object.keys(collections).forEach((collection) => {
    promises.push(collections[collection].deleteMany())
  })
  await Promise.all(promises)
})

