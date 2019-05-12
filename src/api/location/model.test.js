import { Location } from '.'

let location

beforeEach(async () => {
  location = await Location.create({ name: 'test', label: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = location.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(location.id)
    expect(view.name).toBe(location.name)
    expect(view.label).toBe(location.label)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = location.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(location.id)
    expect(view.name).toBe(location.name)
    expect(view.label).toBe(location.label)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
