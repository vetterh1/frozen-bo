import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Item } from '.'
import { User } from '../user'

const generateCode = async (category, user) => {
  try {
    console.log('item generateCode category, user:', category, user);

    // Find next id for this category:
    let nextId = 0;
    if(user.nextIds) {
      console.log('1');
      const nextIdString = user.nextIds.get(category);
      if(nextIdString) nextId = parseInt(nextIdString);
    }
    else {
      console.log('2');
      user.nextIds = {};
    }
    if(!nextId) {
      console.log('3');
      nextId = 0;
    }
    console.log('item generateCode nextId:', nextId);

    // Generate the code:
    const code = `${category}${user.homeOrder}${nextId}`
    console.log('item generateCode code:', code);

    // Increment the nextId and save it:
    user.nextIds.set(category, nextId + 1);
    const res = await user.save()
    console.log('item generateCode res update category nextId:', res);

    return code;
    
  } catch (error) {
    console.error('item generateCode error:', error);
    return null;  
  }

}





export const create = async ({ user, bodymen: { body } }, res, next) => {
  console.log('Create item: ', body, user);
  const code = await generateCode(body.category, user);
  Item.create({ ...body, code, user: user.id })
    // .then((item) => {console.log('item: ', item); return item})
    .then((item) => item.view(true))
    .then(success(res, 201))
    .catch(next)
}

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Item.find(query, select, cursor)
    // .populate('user')
    .then((items) => items.map((item) => item.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Item.findById(params.id)
    // .populate('user')
    .then(notFound(res))
    .then((item) => item ? item.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) => {
  Item.findById(params.id)
  // .populate('user')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((item) => item ? Object.assign(item, body).save() : null)
    .then((item) => item ? item.view(true) : null)
    .then(success(res))
    .catch(next)
  }

export const destroy = ({ user, params }, res, next) =>
  Item.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((item) => item ? item.remove() : null)
    .then(success(res, 204))
    .catch(next)
