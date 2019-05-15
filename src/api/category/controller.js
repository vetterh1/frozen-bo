import { success, notFound } from '../../services/response'
import { Category } from '.'
import { defaultCharacteristics } from '../../utils/defaultCharacteristics'
import stringifyOnce from '../../utils/stringifyOnce.js'


export const initWithDefault = async (b, res, next) => {
  try {
    await Category.deleteMany();
    let inserted = [];
    const results = defaultCharacteristics.categories.map( async (item) => {
      inserted.push (await Category.create(item));
    })
    Promise.all(results).then( () => {
      success(res, 201)(inserted); 
    });

  } catch (err) {
    // console.error("err:", stringifyOnce(err));
    await notFound(err);
    next(err);
  }
}


export const create = ({ bodymen: { body } }, res, next) =>
  Category.create(body)
    .then((category) => category.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Category.find(query, select, cursor)
    .then((categories) => categories.map((category) => category.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Category.findById(params.id)
    .then(notFound(res))
    .then((category) => category ? category.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Category.findById(params.id)
    .then(notFound(res))
    .then((category) => category ? Object.assign(category, body).save() : null)
    .then((category) => category ? category.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Category.findById(params.id)
    .then(notFound(res))
    .then((category) => category ? category.remove() : null)
    .then(success(res, 204))
    .catch(next)
