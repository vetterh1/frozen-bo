import { success, notFound } from '../../services/response/'
import { Size } from '.'
import { defaultCharacteristics } from '../../utils/defaultCharacteristics'
// import stringifyOnce from '../../utils/stringifyOnce.js'


export const createDefaultSizesInDb = async (done) => {
  try {
    let inserted = [];
    const results = defaultCharacteristics.sizes.map( async (item) => {
      inserted.push (await Size.create(item));
    })
    return Promise.all(results).then(() => done(inserted));

  } catch (err) /* istanbul ignore next */ {
    throw err;
  }
}

export const initWithDefault = async (b, res, next) => {
  try {
    await Size.deleteMany();
    await createDefaultSizesInDb((data)=> {
      success(res, 201)(data); 
    })
  } catch (err) /* istanbul ignore next */ {
    await notFound(err);
    next(err);
  }
}


export const create = ({ bodymen: { body } }, res, next) =>
  Size.create(body)
    .then((size) => size.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Size.find(query, select, cursor)
    .then((sizes) => sizes.map((size) => size.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Size.findById(params.id)
    .then(notFound(res))
    .then((size) => size ? size.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Size.findById(params.id)
    .then(notFound(res))
    .then((size) => size ? Object.assign(size, body).save() : null)
    .then((size) => size ? size.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Size.findById(params.id)
    .then(notFound(res))
    .then((size) => size ? size.remove() : null)
    .then(success(res, 204))
    .catch(next)
