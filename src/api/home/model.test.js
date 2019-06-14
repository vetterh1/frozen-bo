import { Home } from '.'

let home

beforeEach(async () => {
  home = await Home.create({ name: 'test', label: 'test', id2: 'test', mapCategoriesNextIds: [{category:'B', nextId:1}, {category:'V', nextId:1}, {category:'S', nextId:3}] })
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
    expect(view.mapCategoriesNextIds).toBe(home.mapCategoriesNextIds)

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
    expect(view.mapCategoriesNextIds).toBe(home.mapCategoriesNextIds)
  })
})
