import { success, notFound } from '../../services/response/'
import { User } from '.'
import Home from '../home/model'
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

export const showMe = ({ user }, res) => {
  // console.log('user showMe:', user);
  if(user.language)
    user.language.toLowerCase();
  return res.json(user.view(true))
}

export const create = ({ bodymen: { body } }, res, next) =>
  User.create(body)
    .then(user => {
      sign(user.id)
        .then((token) => ({ token, user: user.view(true) }))
        .then(success(res, 201))
    })
    .catch((err) => {
      // console.log('User create error:', err);

      /* istanbul ignore next */
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
      // console.log('------------------------------------------------------------------------------------ user update 1:', result);
      // console.log('user param:', user);
      // console.log('params param:', params);
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
      // console.log('user update 2 user:', user, user.constructor.name);
      // console.log('user update 2 body:', body, body.constructor.name);      
      // console.log('user update 2 user properties:', Object.getOwnPropertyNames(user));
      // console.log('user update 2 body properties:', Object.getOwnPropertyNames(body));

      const updatedProperties = Object.getOwnPropertyNames(body)
      updatedProperties.forEach(element => {
        if(body[element]) {
          // console.log('update:', element, body[element]);

          user[element] = body[element]
        } else {
          // console.log('NO update:', element, body[element]);
        }
      });
      // const newUser = user ? Object.assign(user, body) : null
      // console.log('user update 2 user updated:', user, user.constructor.name);
      // console.log('user update 2 user updated properties:', Object.getOwnPropertyNames(user));

      return user.save()


      // db.users.updateOne({ _id: ObjectId("5cf7c068ed594933d1ddfcee")}, { '$set': { name: 'updated name'}})
      // db.users.updateOne({ _id: ObjectId("5cf7c068ed594933d1ddfcee")}, { '$unset': { home: 1, homeOrder:1}})

    })
    .then((user) => {
      // console.log('user update 3:', user);
      return user ? user.view(true) : null
    })
    .then(success(res))
    .catch(next)





    export const joinHome = async ({ bodymen: { body }, params, user }, res, next) => {
      try {
        const userFound = await User.findById(params.id === 'me' ? user.id : params.id);
        /* istanbul ignore next */
        if(!userFound) return notFound(res)(userFound);
        const isAdmin = user.role === 'admin'
        const isSelfUpdate = user.id === userFound.id
        // console.log('user joinHome params:', params);
        // console.log('user joinHome user to update:', user);
        // console.log('user joinHome user found:', userFound);

        if (!isSelfUpdate && !isAdmin) {
          res.status(401).json({
            valid: false,
            message: 'You can\'t change other user\'s data'
          })
          return null
        }  
        // console.log('user joinHome body:', body);
  
        // Home is already set and the same: return success & null content
        /* istanbul ignore next */
        if(userFound.home === body.home) success(res)(null);

        const homeFound = await Home.findById2(body.home);
        /* istanbul ignore next */
        if(!homeFound) return notFound(res)(null);
        // console.log('user joinHome found:', homeFound);
  
        userFound.home = homeFound.id2;
        userFound.homeOrder = homeFound.nextHomeOrder++;
        const resUserSave = await userFound.save();
        const resHomeSave = await homeFound.save();
        // console.log('user joinHome resUserSave:', resUserSave);
        // console.log('user joinHome resHomeSave:', resHomeSave);

        success(res)({home: resHomeSave, user: resUserSave});

      } catch (error) {
        /* istanbul ignore next */
        console.error('user joinHome error:', error);
        res.status(500).end()
      }
  }





    export const joinNewHome = async ({ body , params, user }, res) => {
      console.log('user joinNewHome params:', params);
      console.log('user joinNewHome user:', user);
      console.log('user joinNewHome body:', body);

      try {
        const userFound = await User.findById(params.id === 'me' ? user.id : params.id);
        /* istanbul ignore next */
        if(!userFound) return notFound(res)(userFound);
        const isAdmin = user.role === 'admin'
        const isSelfUpdate = user.id === userFound.id

        if (!isSelfUpdate && !isAdmin) {
          res.status(401).json({
            valid: false,
            message: 'You can\'t change other user\'s data'
          })
          return null
        }  
  
        // If user already has a home... should do something... maybe delete old home if no user attached to it...
        // if(userFound.home) ......

        const homeNew = await Home.create(body);
        userFound.home = homeNew.id2;
        userFound.homeOrder = homeNew.nextHomeOrder++;
        const resUserSave = await userFound.save();
        const resHomeSave = await homeNew.save();
        // console.log('user joinHome resUserSave:', resUserSave);
        // console.log('user joinHome resHomeSave:', resHomeSave);

        success(res)({home: resHomeSave, user: resUserSave});

      } catch (error) {
        /* istanbul ignore next */
        console.log('user joinNewHome error:', error);
        res.status(500).end()
      }
  }







  export const leaveHome = async ({ bodymen: { body }, params, user }, res, next) => {
    try {
      const userFound = await User.findById(params.id === 'me' ? user.id : params.id);
      /* istanbul ignore next */
      if(!userFound) return notFound(res)(userFound);
      const isAdmin = user.role === 'admin'
      const isSelfUpdate = user.id === userFound.id
      // console.log('user joinHome params:', params);
      // console.log('user joinHome user to update:', user);
      // console.log('user joinHome user found:', userFound);

      if (!isSelfUpdate && !isAdmin) {
        res.status(401).json({
          valid: false,
          message: 'You can\'t change other user\'s data'
        })
        return null
      }  
      // console.log('user joinHome body:', body);

      userFound.home = null;
      userFound.homeOrder = null;
      const resUserSave = await userFound.save();
      // console.log('user joinHome resUserSave:', resUserSave);
      // console.log('user joinHome resHomeSave:', resHomeSave);

      success(res)({user: resUserSave});

    } catch (error) {
      console.log('user LeaveHome error:', error);
      res.status(500).end()
    }
}




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
