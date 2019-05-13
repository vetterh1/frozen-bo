import { Router } from 'express'
import user from './user'
import auth from './auth'
import passwordReset from './password-reset'
import test2 from './test2'
import item from './item'
import category from './category'
import detail from './detail'
import container from './container'
import color from './color'
import size from './size'
import freezer from './freezer'
import location from './location'
import characteristics from './characteristics'

const router = new Router()

/**
 * @apiDefine master Master access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine admin Admin access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine user User access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine listParams
 * @apiParam {String} [q] Query to search.
 * @apiParam {Number{1..30}} [page=1] Page number.
 * @apiParam {Number{1..100}} [limit=30] Amount of returned items.
 * @apiParam {String[]} [sort=-createdAt] Order of returned items.
 * @apiParam {String[]} [fields] Fields to be returned.
 */
router.use('/users', user)
router.use('/auth', auth)
router.use('/password-resets', passwordReset)
router.use('/test2', test2)
router.use('/items', item)
router.use('/categories', category)
router.use('/details', detail)
router.use('/containers', container)
router.use('/colors', color)
router.use('/sizes', size)
router.use('/freezers', freezer)
router.use('/locations', location)
router.use('/characteristics', characteristics)

export default router
