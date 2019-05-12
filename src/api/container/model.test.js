import { Container } from '.'

let container

beforeEach(async () => {
  container = await Container.create({ name: 'test', label: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = container.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(container.id)
    expect(view.name).toBe(container.name)
    expect(view.label).toBe(container.label)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = container.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(container.id)
    expect(view.name).toBe(container.name)
    expect(view.label).toBe(container.label)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
