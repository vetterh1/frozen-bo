import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Location, { schema } from './model'

const router = new Router()
const { name, label } = schema.tree

/**
 * @api {post} /locations Create location
 * @apiName CreateLocation
 * @apiGroup Location
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Location's name.
 * @apiParam label Location's label.
 * @apiSuccess {Object} location Location's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Location not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ name, label }),
  create)

/**
 * @api {get} /locations Retrieve locations
 * @apiName RetrieveLocations
 * @apiGroup Location
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} locations List of locations.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /locations/:id Retrieve location
 * @apiName RetrieveLocation
 * @apiGroup Location
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} location Location's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Location not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /locations/:id Update location
 * @apiName UpdateLocation
 * @apiGroup Location
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Location's name.
 * @apiParam label Location's label.
 * @apiSuccess {Object} location Location's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Location not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ name, label }),
  update)

/**
 * @api {delete} /locations/:id Delete location
 * @apiName DeleteLocation
 * @apiGroup Location
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Location not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
