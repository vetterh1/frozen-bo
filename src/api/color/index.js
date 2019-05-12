import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Color, { schema } from './model'

const router = new Router()
const { name, label, parents } = schema.tree

/**
 * @api {post} /colors Create color
 * @apiName CreateColor
 * @apiGroup Color
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Color's name.
 * @apiParam label Color's label.
 * @apiParam parents Color's parents.
 * @apiSuccess {Object} color Color's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Color not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ name, label, parents }),
  create)

/**
 * @api {get} /colors Retrieve colors
 * @apiName RetrieveColors
 * @apiGroup Color
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} colors List of colors.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /colors/:id Retrieve color
 * @apiName RetrieveColor
 * @apiGroup Color
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} color Color's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Color not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /colors/:id Update color
 * @apiName UpdateColor
 * @apiGroup Color
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Color's name.
 * @apiParam label Color's label.
 * @apiParam parents Color's parents.
 * @apiSuccess {Object} color Color's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Color not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ name, label, parents }),
  update)

/**
 * @api {delete} /colors/:id Delete color
 * @apiName DeleteColor
 * @apiGroup Color
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Color not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
