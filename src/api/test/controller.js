import { success, notFound } from '../../services/response/'
import { Test } from '.'

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Test.find(query, select, cursor)
    .then((tests) => tests.map((test) => test.view()))
    .then(success(res))
    .catch(next)
