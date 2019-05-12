import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Test2, { schema } from './model'

const router = new Router()
const { name } = schema.tree

/**
 * @api {post} /test2 Create test 2
 * @apiName CreateTest2
 * @apiGroup Test2
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Test 2's name.
 * @apiSuccess {Object} test2 Test 2's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Test 2 not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ name }),
  create)

/**
 * @api {get} /test2 Retrieve test 2 s
 * @apiName RetrieveTest2S
 * @apiGroup Test2
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} test2S List of test 2 s.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /test2/:id Retrieve test 2
 * @apiName RetrieveTest2
 * @apiGroup Test2
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} test2 Test 2's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Test 2 not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /test2/:id Update test 2
 * @apiName UpdateTest2
 * @apiGroup Test2
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Test 2's name.
 * @apiSuccess {Object} test2 Test 2's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Test 2 not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ name }),
  update)

/**
 * @api {delete} /test2/:id Delete test 2
 * @apiName DeleteTest2
 * @apiGroup Test2
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Test 2 not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
