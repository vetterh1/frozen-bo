import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Test2 } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Test2.create({ ...body, user })
    .then((test2) => test2.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Test2.find(query, select, cursor)
    .populate('user')
    .then((test2S) => test2S.map((test2) => test2.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Test2.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then((test2) => test2 ? test2.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Test2.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((test2) => test2 ? Object.assign(test2, body).save() : null)
    .then((test2) => test2 ? test2.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Test2.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((test2) => test2 ? test2.remove() : null)
    .then(success(res, 204))
    .catch(next)
