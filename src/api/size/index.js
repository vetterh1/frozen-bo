import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, initWithDefault, show, update, destroy } from './controller'
import { schema } from './model'
export Size, { schema } from './model'

const router = new Router()
const { name, label, id2 } = schema.tree

/**
 * @api {post} /sizes/initWithDefault Init sizes with default list
 * @apiName InitializeDefaultSizes
 * @apiGroup Size
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Size not found.
 * @apiError 401 admin access only.
 */
router.post('/initWithDefault',
  //token({ required: true, roles: ['admin'] }),
  initWithDefault)

/**
 * @api {post} /sizes Create size
 * @apiName CreateSize
 * @apiGroup Size
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Size's name.
 * @apiParam label Size's label.
 * @apiSuccess {Object} size Size's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Size not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ name, label, id2 }),
  create)

/**
 * @api {get} /sizes Retrieve sizes
 * @apiName RetrieveSizes
 * @apiGroup Size
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} sizes List of sizes.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /sizes/:id Retrieve size
 * @apiName RetrieveSize
 * @apiGroup Size
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} size Size's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Size not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /sizes/:id Update size
 * @apiName UpdateSize
 * @apiGroup Size
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Size's name.
 * @apiParam label Size's label.
 * @apiSuccess {Object} size Size's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Size not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ name, label, id2 }),
  update)

/**
 * @api {delete} /sizes/:id Delete size
 * @apiName DeleteSize
 * @apiGroup Size
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Size not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
