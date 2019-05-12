import { Characteristics } from '.'

let characteristics

beforeEach(async () => {
  characteristics = await Characteristics.create({ version: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = characteristics.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(characteristics.id)
    expect(view.version).toBe(characteristics.version)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = characteristics.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(characteristics.id)
    expect(view.version).toBe(characteristics.version)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
