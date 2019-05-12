import { Freezer } from '.'

let freezer

beforeEach(async () => {
  freezer = await Freezer.create({ name: 'test', label: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = freezer.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(freezer.id)
    expect(view.name).toBe(freezer.name)
    expect(view.label).toBe(freezer.label)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = freezer.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(freezer.id)
    expect(view.name).toBe(freezer.name)
    expect(view.label).toBe(freezer.label)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
