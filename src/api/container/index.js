import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, initWithDefault, show, update, destroy } from './controller'
import { schema } from './model'
export Container, { schema } from './model'

const router = new Router()
const { name, label, id2 } = schema.tree

/**
 * @api {post} /containers/initWithDefault Init containers with default list
 * @apiName InitializeDefaultContainers
 * @apiGroup Container
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Container not found.
 * @apiError 401 admin access only.
 */
router.post('/initWithDefault',
  //token({ required: true, roles: ['admin'] }),
  initWithDefault)

/**
 * @api {post} /containers Create container
 * @apiName CreateContainer
 * @apiGroup Container
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Container's name.
 * @apiParam label Container's label.
 * @apiSuccess {Object} container Container's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Container not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ name, label, id2 }),
  create)

/**
 * @api {get} /containers Retrieve containers
 * @apiName RetrieveContainers
 * @apiGroup Container
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} containers List of containers.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /containers/:id Retrieve container
 * @apiName RetrieveContainer
 * @apiGroup Container
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} container Container's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Container not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /containers/:id Update container
 * @apiName UpdateContainer
 * @apiGroup Container
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Container's name.
 * @apiParam label Container's label.
 * @apiSuccess {Object} container Container's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Container not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ name, label, id2 }),
  update)

/**
 * @api {delete} /containers/:id Delete container
 * @apiName DeleteContainer
 * @apiGroup Container
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Container not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
