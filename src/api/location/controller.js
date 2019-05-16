import { success, notFound } from '../../services/response/'
import { Location } from '.'
import { defaultCharacteristics } from '../../utils/defaultCharacteristics'
// import stringifyOnce from '../../utils/stringifyOnce.js'


export const initWithDefault = async (b, res, next) => {
  try {
    await Location.deleteMany();
    let inserted = [];
    const results = defaultCharacteristics.locations.map( async (item) => {
      inserted.push (await Location.create(item));
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
  Location.create(body)
    .then((location) => location.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Location.find(query, select, cursor)
    .then((locations) => locations.map((location) => location.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Location.findById(params.id)
    .then(notFound(res))
    .then((location) => location ? location.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Location.findById(params.id)
    .then(notFound(res))
    .then((location) => location ? Object.assign(location, body).save() : null)
    .then((location) => location ? location.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Location.findById(params.id)
    .then(notFound(res))
    .then((location) => location ? location.remove() : null)
    .then(success(res, 204))
    .catch(next)