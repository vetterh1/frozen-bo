import mongoose, { Schema } from 'mongoose'

const colorSchema = new Schema({
  id2: { type: 'String', required: true },
  name: { type: 'String', required: true },
  label: { type: 'String', required: false },
  i18nName: Schema.Types.Mixed, // ex: i18n: {FR: 'Plat'}
  i18nLabel: Schema.Types.Mixed, // ex: i18n: {FR: 'Plat'}
  parents: [String], // e: ['V', 'S', 'M', 'P', 'F']
}, {
  timestamps: true, // adds createdAt and updatedAt
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
      id2: this.id2,
      name: this.name,
      label: this.label,
      i18nName: this.i18nName,
      i18nLabel: this.i18nLabel, 
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
