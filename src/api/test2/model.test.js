import { Test2 } from '.'
import { User } from '../user'

let user, test2

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  test2 = await Test2.create({ user, name: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = test2.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(test2.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.name).toBe(test2.name)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = test2.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(test2.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.name).toBe(test2.name)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
