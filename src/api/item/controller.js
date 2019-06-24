import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Item } from '.'

const generateCode = (category, homeOrder) => {
  const nextId = 23;
  return `${category}${homeOrder}${nextId}`;

  console.log('itemSchema.pre.save:', this);  
}





export const create = ({ user, bodymen: { body } }, res, next) => {
  const code = generateCode(body.category, user.homeOrder);
  console.log('Create item: ', body, user);
  Item.create({ ...body, code, user })
    .then((item) => {console.log('item: ', item); return item.view(true)})
    .then(success(res, 201))
    .catch(next)
}

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Item.find(query, select, cursor)
    .populate('user')
    .then((items) => items.map((item) => item.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Item.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then((item) => item ? item.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Item.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((item) => item ? Object.assign(item, body).save() : null)
    .then((item) => item ? item.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Item.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((item) => item ? item.remove() : null)
    .then(success(res, 204))
    .catch(next)
