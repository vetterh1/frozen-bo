import { Item } from '.'
import { User } from '../user'

let user, item

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  item = await Item.create({ user, category: 'test', details: 'test', container: 'test', color: 'test', size: 'test', freezer: 'test', location: 'test', name: 'test', expiration: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = item.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(item.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.category).toBe(item.category)
    expect(view.details).toBe(item.details)
    expect(view.container).toBe(item.container)
    expect(view.color).toBe(item.color)
    expect(view.size).toBe(item.size)
    expect(view.freezer).toBe(item.freezer)
    expect(view.location).toBe(item.location)
    expect(view.name).toBe(item.name)
    expect(view.expiration).toBe(item.expiration)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = item.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(item.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.category).toBe(item.category)
    expect(view.details).toBe(item.details)
    expect(view.container).toBe(item.container)
    expect(view.color).toBe(item.color)
    expect(view.size).toBe(item.size)
    expect(view.freezer).toBe(item.freezer)
    expect(view.location).toBe(item.location)
    expect(view.name).toBe(item.name)
    expect(view.expiration).toBe(item.expiration)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})