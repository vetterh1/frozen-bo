import { success, notFound } from '../../services/response/'
import { Freezer } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Freezer.create(body)
    .then((freezer) => freezer.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Freezer.find(query, select, cursor)
    .then((freezers) => freezers.map((freezer) => freezer.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Freezer.findById(params.id)
    .then(notFound(res))
    .then((freezer) => freezer ? freezer.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Freezer.findById(params.id)
    .then(notFound(res))
    .then((freezer) => freezer ? Object.assign(freezer, body).save() : null)
    .then((freezer) => freezer ? freezer.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Freezer.findById(params.id)
    .then(notFound(res))
    .then((freezer) => freezer ? freezer.remove() : null)
    .then(success(res, 204))
    .catch(next)
