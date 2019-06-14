import mongoose, { Schema } from 'mongoose'

const homeSchema = new Schema({
  id2: { type: 'String', required: true },
  name: { type: 'String', required: true },
  label: { type: 'String', required: false },
  mapCategoriesNextIds: [{
    category: String,
    nextId: Number
  }]
}, {
  timestamps: true, // adds createdAt and updatedAt
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

homeSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      id2: this.id2,
      name: this.name,
      label: this.label,
      mapCategoriesNextIds: this.mapCategoriesNextIds,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Home', homeSchema)

export const schema = model.schema
export default model
