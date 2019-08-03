import Item from './model'
import { User } from '../user'
import { Home } from '../home'


let home, user, item

beforeEach(async () => {
  home = await Home.create({ name: 'home1', label: 'label home 1' })
  user = await User.create({ email: 'a@a.com', password: '123456', home: home.id2 })
  item = await Item.create({ user: user.id, home: home.id2, code: 'T1234', category: 'C', details: 'test1,test2', container: 'test', color: 'test',
    size: '3', freezer: 'test', location: 'test', name: 'test', expirationDate: new Date(), expirationInMonth: '6',
    nextIds: {} })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = item.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(item.id)
    expect(view.user).toBe(user.id)
    expect(view.home).toBe(home.id2)
    expect(view.code).toBe(item.code)
    expect(view.category).toBe(item.category)
    expect(view.details).toBe(item.details)
    expect(view.container).toBe(item.container)
    expect(view.color).toBe(item.color)
    expect(view.size).toBe(item.size)
    expect(view.freezer).toBe(item.freezer)
    expect(view.location).toBe(item.location)
    expect(view.name).toBe(item.name)
    expect(view.expirationDate).toBe(item.expirationDate.valueOf())
    expect(view.expirationInMonth).toBe(item.expirationInMonth)
    expect(view.pictureName).toBe(item.pictureName)
    expect(view.thumbnailName).toBe(item.thumbnailName)
    expect(view.removed).toBe(item.removed)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = item.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(item.id)
    expect(view.user).toBe(user.id)
    expect(view.home).toBe(home.id2)
    expect(view.code).toBe(item.code)
    expect(view.category).toBe(item.category)
    expect(view.details).toBe(item.details)
    expect(view.container).toBe(item.container)
    expect(view.color).toBe(item.color)
    expect(view.size).toBe(item.size)
    expect(view.freezer).toBe(item.freezer)
    expect(view.location).toBe(item.location)
    expect(view.name).toBe(item.name)
    expect(view.expirationDate).toBe(item.expirationDate.valueOf())
    expect(view.expirationInMonth).toBe(item.expirationInMonth)
    expect(view.pictureName).toBe(item.pictureName)
    expect(view.thumbnailName).toBe(item.thumbnailName)
    expect(view.removed).toBe(item.removed)    
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
