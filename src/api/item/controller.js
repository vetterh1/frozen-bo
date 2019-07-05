import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Item } from '.'



const generateCode = async (category, user) => {
  try {
    // Find next id for this category:
    let nextId = 0;
    if(user.nextIds) {
      const nextIdString = user.nextIds.get(category);
      if(nextIdString) nextId = parseInt(nextIdString);
    }
    else 
      user.nextIds = {};
    if(!nextId) nextId = 0;

    // Generate the code:
    const code = `${category}${user.homeOrder}${nextId}`

    // Increment the nextId and save it:
    user.nextIds.set(category, nextId + 1);
    const res = await user.save()

    return code;
    
  } catch (error) {
    console.error('item generateCode error:', error);
    return null;  
  }

}





export const create = async ({ user, bodymen: { body } }, res, next) => {
  // console.log('Create item: ', body, user);
  const code = await generateCode(body.category, user);
  Item.create({ ...body, code, user: user.id })
    // .then((item) => {console.log('item: ', item); return item})
    .then((item) => item.view(true))
    .then(success(res, 201))
    .catch(next)
}

export const index = ({ user, querymen: { query, select, cursor } }, res, next) =>
  Item.find({user: user.id}, select, cursor)
    .then((items) => {console.error('items=', items, ' \n - user.id: ', user.id ); return items})
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
    // .then((item) => item ? Object.assign(item, body).save() : null)
    .then((item) => {
      // console.log('item update 2 item:', item, item.constructor.name);
      // console.log('item update 2 body:', body, body.constructor.name);      
      // console.log('item update 2 item properties:', Object.getOwnPropertyNames(item));
      // console.log('item update 2 body properties:', Object.getOwnPropertyNames(body));

      const updatedProperties = Object.getOwnPropertyNames(body)
      updatedProperties.forEach(element => {
        if(body[element]) {
          // console.log('item update:', element, body[element]);

          item[element] = body[element]
        } else {
          // console.log('NO update:', element, body[element]);
        }
      });
      // const newUser = item ? Object.assign(item, body) : null
      // console.log('item update 2 item updated:', item, item.constructor.name);
      // console.log('item update 2 item updated properties:', Object.getOwnPropertyNames(item));

      return item.save()


      // db.items.updateOne({ _id: ObjectId("5cf7c068ed594933d1ddfcee")}, { '$set': { name: 'updated name'}})
      // db.items.updateOne({ _id: ObjectId("5cf7c068ed594933d1ddfcee")}, { '$unset': { home: 1, homeOrder:1}})

    })    
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
