import mongoose, { Schema } from 'mongoose'

const colorSchema = new Schema({
  name: {
    type: String
  },
  label: {
    type: String
  },
  parents: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

colorSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      label: this.label,
      parents: this.parents,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Color', colorSchema)

export const schema = model.schema
export default model
