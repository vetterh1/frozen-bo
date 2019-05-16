import { success, notFound } from '../../services/response/'
import { Container } from '.'
import { defaultCharacteristics } from '../../utils/defaultCharacteristics'
// import stringifyOnce from '../../utils/stringifyOnce.js'


export const initWithDefault = async (b, res, next) => {
  try {
    await Container.deleteMany();
    let inserted = [];
    const results = defaultCharacteristics.containers.map( async (item) => {
      inserted.push (await Container.create(item));
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
  Container.create(body)
    .then((container) => container.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Container.find(query, select, cursor)
    .then((containers) => containers.map((container) => container.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Container.findById(params.id)
    .then(notFound(res))
    .then((container) => container ? container.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Container.findById(params.id)
    .then(notFound(res))
    .then((container) => container ? Object.assign(container, body).save() : null)
    .then((container) => container ? container.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Container.findById(params.id)
    .then(notFound(res))
    .then((container) => container ? container.remove() : null)
    .then(success(res, 204))
    .catch(next)
