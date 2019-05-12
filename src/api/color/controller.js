import { success, notFound } from '../../services/response/'
import { Color } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Color.create(body)
    .then((color) => color.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Color.find(query, select, cursor)
    .then((colors) => colors.map((color) => color.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Color.findById(params.id)
    .then(notFound(res))
    .then((color) => color ? color.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Color.findById(params.id)
    .then(notFound(res))
    .then((color) => color ? Object.assign(color, body).save() : null)
    .then((color) => color ? color.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Color.findById(params.id)
    .then(notFound(res))
    .then((color) => color ? color.remove() : null)
    .then(success(res, 204))
    .catch(next)
