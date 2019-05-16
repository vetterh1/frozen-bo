import { Container } from '.'

let container

beforeEach(async () => {
  container = await Container.create({ name: 'test', label: 'test', id2: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = container.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(container.id)
    expect(view.name).toBe(container.name)
    expect(view.label).toBe(container.label)
    expect(view.id2).toBe(container.id2)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = container.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(container.id)
    expect(view.name).toBe(container.name)
    expect(view.label).toBe(container.label)
    expect(view.id2).toBe(container.id2)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
