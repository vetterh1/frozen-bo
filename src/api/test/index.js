import { Router } from 'express'
import { middleware as query } from 'querymen'
import { index } from './controller'
export Test, { schema } from './model'

const router = new Router()

/**
 * @api {get} /test Retrieve tests
 * @apiName RetrieveTests
 * @apiGroup Test
 * @apiUse listParams
 * @apiSuccess {Object[]} tests List of tests.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

export default router
