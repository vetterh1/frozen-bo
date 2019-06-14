import { success, notFound } from '../../services/response/'
import { User } from '.'
import { sign } from '../../services/jwt'

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  User.find(query, select, cursor)
    .then((users) => users.map((user) => user.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  User.findById(params.id)
    .then(notFound(res))
    .then((user) => user ? user.view() : null)
    .then(success(res))
    .catch(next)

export const showMe = ({ user }, res) =>
  res.json(user.view(true))

export const create = ({ bodymen: { body } }, res, next) =>
  User.create(body)
    .then(user => {
      sign(user.id)
        .then((token) => ({ token, user: user.view(true) }))
        .then(success(res, 201))
    })
    .catch((err) => {
      /* istanbul ignore else */
      if (err.name === 'MongoError' && err.code === 11000) {
        res.status(409).json({
          valid: false,
          param: 'email',
          message: 'email already registered'
        })
      } else {
        next(err)
      }
    })

export const update = ({ bodymen: { body }, params, user }, res, next) =>
  User.findById(params.id === 'me' ? user.id : params.id)
    .then(notFound(res))
    .then((result) => {
      if (!result) return null
      console.log('------------------------------------------------------------------------------------ user update 1:', result);
      const isAdmin = user.role === 'admin'
      const isSelfUpdate = user.id === result.id
      if (!isSelfUpdate && !isAdmin) {
        res.status(401).json({
          valid: false,
          message: 'You can\'t change other user\'s data'
        })
        return null
      }
      return result
    })
    .then((user) => {
      console.log('user update 2 user:', user, user.constructor.name);
      console.log('user update 2 body:', body, body.constructor.name);      
      console.log('user update 2 user properties:', Object.getOwnPropertyNames(user));
      console.log('user update 2 body properties:', Object.getOwnPropertyNames(body));

      const updatedProperties = Object.getOwnPropertyNames(body)
      updatedProperties.forEach(element => {
        if(body[element]) {
          console.log('update:', element, body[element]);

          user[element] = body[element]
        } else {
          console.log('NO update:', element, body[element]);
        }
      });
      // const newUser = user ? Object.assign(user, body) : null
      console.log('user update 2 user updated:', user, user.constructor.name);
      console.log('user update 2 user updated properties:', Object.getOwnPropertyNames(user));

      return user.save()


      // db.users.updateOne({ _id: ObjectId("5cf7c068ed594933d1ddfcee")}, { '$set': { name: 'updated name'}})
      // db.users.updateOne({ _id: ObjectId("5cf7c068ed594933d1ddfcee")}, { '$unset': { home: 1, homeOrder:1}})

    })
    .then((user) => {
      console.log('user update 3:', user);
      return user ? user.view(true) : null
    })
    .then(success(res))
    .catch(next)

export const updatePassword = ({ bodymen: { body }, params, user }, res, next) =>
  User.findById(params.id === 'me' ? user.id : params.id)
    .then(notFound(res))
    .then((result) => {
      if (!result) return null
      const isSelfUpdate = user.id === result.id
      if (!isSelfUpdate) {
        res.status(401).json({
          valid: false,
          param: 'password',
          message: 'You can\'t change other user\'s password'
        })
        return null
      }
      return result
    })
    .then((user) => user ? user.set({ password: body.password }).save() : null)
    .then((user) => user ? user.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  User.findById(params.id)
    .then(notFound(res))
    .then((user) => user ? user.remove() : null)
    .then(success(res, 204))
    .catch(next)
