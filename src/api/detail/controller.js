import { success, notFound } from '../../services/response/'
import { Detail } from '.'
import { defaultCharacteristics } from '../../utils/defaultCharacteristics'
// import stringifyOnce from '../../utils/stringifyOnce.js'


export const initWithDefault = async (b, res, next) => {
  try {
    await Detail.deleteMany();
    let inserted = [];
    const results = defaultCharacteristics.details.map( async (item) => {
      inserted.push (await Detail.create(item));
    })
    Promise.all(results).then( () => {
      success(res, 201)(inserted); 
    });

  } catch (err) /* istanbul ignore next */ {
    await notFound(err);
    next(err);
  }
}


export const create = ({ bodymen: { body } }, res, next) =>
  Detail.create(body)
    .then((detail) => detail.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Detail.find(query, select, cursor)
    .then((details) => details.map((detail) => detail.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Detail.findById(params.id)
    .then(notFound(res))
    .then((detail) => detail ? detail.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Detail.findById(params.id)
    .then(notFound(res))
    .then((detail) => detail ? Object.assign(detail, body).save() : null)
    .then((detail) => detail ? detail.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Detail.findById(params.id)
    .then(notFound(res))
    .then((detail) => detail ? detail.remove() : null)
    .then(success(res, 204))
    .catch(next)
