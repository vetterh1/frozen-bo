import passport from 'passport'
import { Schema } from 'bodymen'
import { BasicStrategy } from 'passport-http'
import { Strategy as BearerStrategy } from 'passport-http-bearer'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import { jwtSecret, masterKey } from '../../config'
import * as facebookService from '../facebook'
import * as githubService from '../github'
import * as googleService from '../google'
import User, { schema } from '../../api/user/model'
import { env } from '../../config'


export const token = ({ required, roles = User.roles } = {}) => (req, res, next) => {
  passport.authenticate('token', { session: false }, (err, user, info) => {
    // console.log('token authenticate: req:', req);
    // console.log('token authenticate: user, err:', user, err);

    if (err || (required && !user) || (required && !~roles.indexOf(user.role))) {
        if (env === 'production' || env === 'development')
          console.error('passport.authenticate: error 401 (err, user):', err, user);
      return res.status(401).end()
    }
    req.logIn(user, { session: false }, (err) => {
      if (err) return res.status(401).end()
      next()
    })
  })(req, res, next)}


  passport.use('token', new JwtStrategy({
    secretOrKey: jwtSecret,
    jwtFromRequest: ExtractJwt.fromExtractors([
      ExtractJwt.fromUrlQueryParameter('access_token'),
      ExtractJwt.fromBodyField('access_token'),
      ExtractJwt.fromAuthHeaderWithScheme('Bearer')
    ])
  }, ({ id }, done) => {
    // console.log('use token: id:', id);
  
    User.findById(id).then((user) => {
      done(null, user)
      return null
    }).catch(done)
  }))

  






export const master = () =>
  passport.authenticate('master', { session: false })

passport.use('master', new BearerStrategy((token, done) => {
  if (token === masterKey) {
    done(null, {})
  } else {
    done(null, false)
  }
}))








export const password = () => (req, res, next) =>
  passport.authenticate('password', { session: false }, (err, user, info) => {
    // console.log('passport.password:', err, user, info);
    if (err && err.param) {
      return res.status(400).json(err)
    } else if (err || !user) {
      if (env === 'production' || env === 'development')
        console.error('passport.password: param error 401 (err or no user):', err, user);
      return res.status(401).end()
    }
    req.logIn(user, { session: false }, (err) => {
      if (err){
        if (env === 'production' || env === 'development')
          console.error('passport.password: login error 401 (err):', err, user);
        return res.status(401).end()
      }
      next()
    })
  })(req, res, next)


passport.use('password', new BasicStrategy((email, password, done) => {
  const userSchema = new Schema({ email: schema.tree.email, password: schema.tree.password })

  userSchema.validate({ email, password }, (err) => {
    if (err) done(err)
  })

  User.findOne({ email }).then((user) => {
    if (!user) {
      done(true)
      return null
    }
    return user.authenticate(password, user.password).then((user) => {
      done(null, user)
      return null
    }).catch(done)
  })
}))











export const facebook = () =>
  passport.authenticate('facebook', { session: false })

export const github = () =>
  passport.authenticate('github', { session: false })

export const google = () =>
  passport.authenticate('google', { session: false })



passport.use('facebook', new BearerStrategy((token, done) => {
  facebookService.getUser(token).then((user) => {
    return User.createFromService(user)
  }).then((user) => {
    done(null, user)
    return null
  }).catch(done)
}))

passport.use('github', new BearerStrategy((token, done) => {
  githubService.getUser(token).then((user) => {
    return User.createFromService(user)
  }).then((user) => {
    done(null, user)
    return null
  }).catch(done)
}))

passport.use('google', new BearerStrategy((token, done) => {
  googleService.getUser(token).then((user) => {
    return User.createFromService(user)
  }).then((user) => {
    done(null, user)
    return null
  }).catch(done)
}))
