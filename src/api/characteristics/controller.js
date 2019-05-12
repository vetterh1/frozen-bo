import { success, notFound } from '../../services/response/'
import { Characteristics } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Characteristics.create(body)
    .then((characteristics) => characteristics.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Characteristics.find(query, select, cursor)
    .then((characteristics) => characteristics.map((characteristics) => characteristics.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Characteristics.findById(params.id)
    .then(notFound(res))
    .then((characteristics) => characteristics ? characteristics.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Characteristics.findById(params.id)
    .then(notFound(res))
    .then((characteristics) => characteristics ? Object.assign(characteristics, body).save() : null)
    .then((characteristics) => characteristics ? characteristics.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Characteristics.findById(params.id)
    .then(notFound(res))
    .then((characteristics) => characteristics ? characteristics.remove() : null)
    .then(success(res, 204))
    .catch(next)
