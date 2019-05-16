import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, initWithDefault, show, update, destroy } from './controller'
import { schema } from './model'
export Detail, { schema } from './model'

const router = new Router()
const { name, label, id2, parents } = schema.tree

/**
 * @api {post} /details/initWithDefault Init details with default list
 * @apiName InitializeDefaultDetails
 * @apiGroup Detail
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Detail not found.
 * @apiError 401 admin access only.
 */
router.post('/initWithDefault',
  //token({ required: true, roles: ['admin'] }),
  initWithDefault)

/**
 * @api {post} /details Create detail
 * @apiName CreateDetail
 * @apiGroup Detail
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Detail's name.
 * @apiParam label Detail's label.
 * @apiParam parents Detail's parents.
 * @apiSuccess {Object} detail Detail's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Detail not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ name, label, id2, parents }),
  create)

/**
 * @api {get} /details Retrieve details
 * @apiName RetrieveDetails
 * @apiGroup Detail
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} details List of details.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /details/:id Retrieve detail
 * @apiName RetrieveDetail
 * @apiGroup Detail
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} detail Detail's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Detail not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /details/:id Update detail
 * @apiName UpdateDetail
 * @apiGroup Detail
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Detail's name.
 * @apiParam label Detail's label.
 * @apiParam parents Detail's parents.
 * @apiSuccess {Object} detail Detail's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Detail not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ name, label, id2, parents }),
  update)

/**
 * @api {delete} /details/:id Delete detail
 * @apiName DeleteDetail
 * @apiGroup Detail
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Detail not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
