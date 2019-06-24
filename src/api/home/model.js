import mongoose, { Schema } from 'mongoose'
import shortid from 'shortid'


const homeSchema = new Schema({
  id2: { type: 'String', unique: true, index: true, default: shortid.generate },
  name: { type: 'String', required: false },
  label: { type: 'String', required: false },
  nextHomeOrder: { type: 'Number', default: 0 },
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
      nextHomeOrder: this.nextHomeOrder,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

homeSchema.statics.findById2 = function(id2) {
  return this.findOne({ id2: id2 });
}

const model = mongoose.model('Home', homeSchema)

export const schema = model.schema
export default model
