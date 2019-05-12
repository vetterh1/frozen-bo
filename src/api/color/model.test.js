import { Color } from '.'

let color

beforeEach(async () => {
  color = await Color.create({ name: 'test', label: 'test', parents: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = color.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(color.id)
    expect(view.name).toBe(color.name)
    expect(view.label).toBe(color.label)
    expect(view.parents).toBe(color.parents)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = color.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(color.id)
    expect(view.name).toBe(color.name)
    expect(view.label).toBe(color.label)
    expect(view.parents).toBe(color.parents)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
