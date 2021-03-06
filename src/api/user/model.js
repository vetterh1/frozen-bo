import crypto from 'crypto'
import bcrypt from 'bcrypt'
import randtoken from 'rand-token'
import mongoose, { Schema } from 'mongoose'
import mongooseKeywords from 'mongoose-keywords'
import { env } from '../../config'

const roles = ['user', 'admin']

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    index: true,
    match: /^\S+@\S+\.\S+$/,
    required: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  name: {
    type: String,
    index: true,
    trim: true
  },  
  language: {
    type: String,
    lowercase: true
  },
  density: {
    type: Number,
    default: 2
  },  
  navigationStyle: {
    type: Number,
    default: 0
  },  
  helpMessageSeen: {
    type: Boolean,
    default: false
  },  
  home: {
    type: String,
  },
  homeOrder: {
    type: Number,
  },
  nextIds: {
    type: Map,
    of: String
  },
  services: {
    facebook: String,
    github: String,
    google: String
  },
  role: {
    type: String,
    enum: roles,
    default: 'user'
  },
  picture: {
    type: String,
    trim: true
  }
}, {
  timestamps: true // adds createdAt and updatedAt
})

userSchema.path('email').set(function (email) {
  if (!this.picture || this.picture.indexOf('https://gravatar.com') === 0) {
    const hash = crypto.createHash('md5').update(email).digest('hex')
    this.picture = `https://gravatar.com/avatar/${hash}?d=identicon`
  }

  if (!this.name) {
    this.name = email.replace(/^(.+)@.+$/, '$1')
  }

  return email
})

userSchema.pre('save', function (next) {

  // console.log('userSchema.pre.save:', this);

  if (!this.isModified('password')) return next()

  /* istanbul ignore next */
  const rounds = env === 'test' ? 1 : 9

  bcrypt.hash(this.password, rounds).then((hash) => {
    this.password = hash
    next()
  }).catch(next)
})

userSchema.methods = {
  view (full) {
    let view = {}
    let fields = ['id', 'name', 'email', 'language', 'density', 'navigationStyle', 'helpMessageSeen', 'home','homeOrder', 'nextIds']

    if (full) {
      fields = [...fields, 'picture', 'createdAt', 'role']
    }

    fields.forEach((field) => { view[field] = this[field] })
    if(!view.language) view.language = "en";
    // console.log('user view: ', view)
    return view
  },

  authenticate (password) {
    // console.log('userSchema.pre.authenticate:', password, this.password);
    return bcrypt.compare(password, this.password).then((valid) => valid ? this : false)
  }
}

// Note: Schema Statics are methods that can be invoked directly by a Model
userSchema.statics = {
  roles,

  createFromService ({ service, id, email, name, picture }) {
    return this.findOne({ $or: [{ [`services.${service}`]: id }, { email }] }).then((user) => {
      if (user) {
        user.services[service] = id
        user.name = name
        user.picture = picture
        return user.save()
      } else {
        const password = randtoken.generate(16)
        return this.create({ services: { [service]: id }, email, password, name, picture })
      }
    })
  }
}

userSchema.plugin(mongooseKeywords, { paths: ['email', 'name'] })

const model = mongoose.model('User', userSchema)

export const schema = model.schema
export default model
