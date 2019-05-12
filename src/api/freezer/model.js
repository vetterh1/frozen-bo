import mongoose, { Schema } from 'mongoose'

const freezerSchema = new Schema({
  name: {
    type: String
  },
  label: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

freezerSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      label: this.label,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Freezer', freezerSchema)

export const schema = model.schema
export default model
