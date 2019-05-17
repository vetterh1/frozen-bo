import { success, notFound } from '../../services/response/'
import { Characteristics } from '.'
import { createDefaultCategoriesInDb } from '../category/controller'
import { defaultCharacteristics } from '../../utils/defaultCharacteristics'
import stringifyOnce from '../../utils/stringifyOnce.js'


export const initWithDefault = async (b, res, next) => {
  try {
    let categories = "";
    await Characteristics.deleteMany();
    let characteristics = await Characteristics.create({version: defaultCharacteristics.version});
    const categoriesPromises = await createDefaultCategoriesInDb((data) => categories = data);
    return Promise.all([categoriesPromises]).then(() => {
      const consolitdatedResults = {
        version: characteristics.version,
        categories
      }
      success(res, 201)(consolitdatedResults);   
    });

  } catch (err) /* istanbul ignore next */ {
    await notFound(err);
    next(err);
  }
}

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
