import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Home, { schema } from './model'

const router = new Router()
const { name, label, id2, mapCategoriesNextIds } = schema.tree

/**
 * @api {post} /homes Create home
 * @apiName CreateHome
 * @apiGroup Home
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Home's name.
 * @apiParam label Home's label.
 * @apiSuccess {Object} home Home's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Home not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true }),
  body({ name, label, id2 }),
  create)

/**
 * @api {get} /homes Retrieve homes
 * @apiName RetrieveHomes
 * @apiGroup Home
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} homes List of homes.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /homes/:id Retrieve home
 * @apiName RetrieveHome
 * @apiGroup Home
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} home Home's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Home not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /homes/:id Update home
 * @apiName UpdateHome
 * @apiGroup Home
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Home's name.
 * @apiParam label Home's label.
 * @apiSuccess {Object} home Home's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Home not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ name, label, id2, mapCategoriesNextIds }),
  update)

/**
 * @api {delete} /homes/:id Delete home
 * @apiName DeleteHome
 * @apiGroup Home
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Home not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
