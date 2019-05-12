import { Detail } from '.'

let detail

beforeEach(async () => {
  detail = await Detail.create({ name: 'test', label: 'test', parents: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = detail.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(detail.id)
    expect(view.name).toBe(detail.name)
    expect(view.label).toBe(detail.label)
    expect(view.parents).toBe(detail.parents)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = detail.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(detail.id)
    expect(view.name).toBe(detail.name)
    expect(view.label).toBe(detail.label)
    expect(view.parents).toBe(detail.parents)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
