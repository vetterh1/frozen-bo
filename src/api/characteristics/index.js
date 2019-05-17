import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, initWithDefault, show, update, destroy } from './controller'
import { schema } from './model'
export Characteristics, { schema } from './model'

const router = new Router()
const { version } = schema.tree

/**
 * @api {post} /characteristics/initWithDefault Init characteristics with default list
 * @apiName InitializeDefaultCharacteristics
 * @apiGroup Characteristics
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Characteristics not found.
 * @apiError 401 admin access only.
 */
router.post('/initWithDefault',
  //token({ required: true, roles: ['admin'] }),
  initWithDefault)

/**
 * @api {post} /characteristics Create characteristics
 * @apiName CreateCharacteristics
 * @apiGroup Characteristics
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam version Characteristics's version.
 * @apiSuccess {Object} characteristics Characteristics's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Characteristics not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ version }),
  create)

/**
 * @api {get} /characteristics Retrieve characteristics
 * @apiName RetrieveCharacteristics
 * @apiGroup Characteristics
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} characteristics List of characteristics.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  // token({ required: true }),
  query(),
  index)

/**
 * @api {get} /characteristics/:id Retrieve characteristics
 * @apiName RetrieveCharacteristics
 * @apiGroup Characteristics
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} characteristics Characteristics's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Characteristics not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /characteristics/:id Update characteristics
 * @apiName UpdateCharacteristics
 * @apiGroup Characteristics
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam version Characteristics's version.
 * @apiSuccess {Object} characteristics Characteristics's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Characteristics not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ version }),
  update)

/**
 * @api {delete} /characteristics/:id Delete characteristics
 * @apiName DeleteCharacteristics
 * @apiGroup Characteristics
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Characteristics not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
