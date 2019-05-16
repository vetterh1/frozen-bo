import { Size } from '.'

let size

beforeEach(async () => {
  size = await Size.create({ name: 'test', label: 'test', id2: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = size.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(size.id)
    expect(view.name).toBe(size.name)
    expect(view.label).toBe(size.label)
    expect(view.id2).toBe(size.id2)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = size.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(size.id)
    expect(view.name).toBe(size.name)
    expect(view.label).toBe(size.label)
    expect(view.id2).toBe(size.id2)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
