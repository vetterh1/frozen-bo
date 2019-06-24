import { Home } from '.'

let home

beforeEach(async () => {
  home = await Home.create({ name: 'test', label: 'test', id2: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = home.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(home.id)
    expect(view.name).toBe(home.name)
    expect(view.label).toBe(home.label)
    expect(view.id2).toBe(home.id2)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = home.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(home.id)
    expect(view.name).toBe(home.name)
    expect(view.label).toBe(home.label)
    expect(view.id2).toBe(home.id2)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
