import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, initWithDefault, show, update, destroy } from './controller'
import { schema } from './model'
export Freezer, { schema } from './model'

const router = new Router()
const { name, label, id2 } = schema.tree

/**
 * @api {post} /freezers/initWithDefault Init freezers with default list
 * @apiName InitializeDefaultFreezers
 * @apiGroup Freezer
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Freezer not found.
 * @apiError 401 admin access only.
 */
router.post('/initWithDefault',
  //token({ required: true, roles: ['admin'] }),
  initWithDefault)

/**
 * @api {post} /freezers Create freezer
 * @apiName CreateFreezer
 * @apiGroup Freezer
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Freezer's name.
 * @apiParam label Freezer's label.
 * @apiSuccess {Object} freezer Freezer's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Freezer not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ name, label, id2 }),
  create)

/**
 * @api {get} /freezers Retrieve freezers
 * @apiName RetrieveFreezers
 * @apiGroup Freezer
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} freezers List of freezers.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /freezers/:id Retrieve freezer
 * @apiName RetrieveFreezer
 * @apiGroup Freezer
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} freezer Freezer's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Freezer not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /freezers/:id Update freezer
 * @apiName UpdateFreezer
 * @apiGroup Freezer
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Freezer's name.
 * @apiParam label Freezer's label.
 * @apiSuccess {Object} freezer Freezer's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Freezer not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ name, label, id2 }),
  update)

/**
 * @api {delete} /freezers/:id Delete freezer
 * @apiName DeleteFreezer
 * @apiGroup Freezer
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Freezer not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
