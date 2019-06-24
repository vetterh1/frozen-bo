import mongoose, { Schema } from 'mongoose'

const itemSchema = new Schema({
  code: {
    type: String,
    unique: true,
    index: true,
    required: true
  },
  user: {
    type: String,
    // type: Schema.ObjectId,
    // ref: 'User',
    required: true
  },
  category: {
    type: String
  },
  details: {
    type: String
  },
  container: {
    type: String
  },
  color: {
    type: String
  },
  size: {
    type: String
  },
  freezer: {
    type: String
  },
  location: {
    type: String
  },
  name: {
    type: String
  },
  expiration: {
    type: Date
  }
}, {
  timestamps: true, // adds createdAt and updatedAt
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

itemSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      code: this.code,
      user: this.user,
      // user: this.user.view(full),
      category: this.category,
      details: this.details,
      container: this.container,
      color: this.color,
      size: this.size,
      freezer: this.freezer,
      location: this.location,
      name: this.name,
      expiration: this.expiration,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}


itemSchema.pre('save', function (next) {

  // // Code already exists, don't need to generate it!
  // if (this.code) return next();

  // const homeOrder = 1;
  // const nextId = 23;
  // this.code = `${this.category}${homeOrder}${nextId}`;

  // console.log('itemSchema.pre.save:', this);


  next();
})

const model = mongoose.model('Item', itemSchema)

export const schema = model.schema
export default model
