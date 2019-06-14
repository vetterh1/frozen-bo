import { success, notFound } from '../../services/response'
import { Home } from '.'
// import stringifyOnce from '../../utils/stringifyOnce.js'



export const create = ({ bodymen: { body } }, res, next) =>
  Home.create(body)
    .then((home) => home.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Home.find(query, select, cursor)
    .then((homes) => homes.map((home) => home.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Home.findById(params.id)
    .then(notFound(res))
    .then((home) => home ? home.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Home.findById(params.id)
    .then(notFound(res))
    .then((home) => {
      console.log("update home:", home)
      return home ? Object.assign(home, body).save() : null
    })
    .then((home) => home ? home.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Home.findById(params.id)
    .then(notFound(res))
    .then((home) => home ? home.remove() : null)
    .then(success(res, 204))
    .catch(next)
