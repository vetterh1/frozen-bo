import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, updatePicture, destroy } from './controller'
import { schema } from './model'
export Item, { schema } from './model'

const router = new Router()
const { category, details, container, color, size, freezer, location, name, expirationDate, expirationInMonth, picture } = schema.tree

/**
 * @api {post} /items Create item
 * @apiName CreateItem
 * @apiGroup Item
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam category Item's category.
 * @apiParam details Item's details.
 * @apiParam container Item's container.
 * @apiParam color Item's color.
 * @apiParam size Item's size.
 * @apiParam freezer Item's freezer.
 * @apiParam location Item's location.
 * @apiParam name Item's name.
 * @apiParam expirationDate Item's expiration date.
 * @apiParam expirationInMonth Item's expiration in months.
 * @apiSuccess {Object} item Item's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Item not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ category, details, container, color, size, freezer, location, name, expirationDate, expirationInMonth }),
  create)

/**
 * @api {get} /items Retrieve items
 * @apiName RetrieveItems
 * @apiGroup Item
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} items List of items.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /items/:id Retrieve item
 * @apiName RetrieveItem
 * @apiGroup Item
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} item Item's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Item not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /items/:id/picture Update item's picture
 * @apiName UpdatePicture
 * @apiGroup Item
 * @apiPermission user
 * @apiDescription Update the picture of an item
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} item Item's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Item not found.
 * @apiError 401 user access only.
 */
router.put('/:id/picture',
  token({ required: true }),
  // body({ pictureData }),
  updatePicture)

/**
 * @api {put} /items/:id Update item
 * @apiName UpdateItem
 * @apiGroup Item
 * @apiPermission user
 * @apiDescription It's possible to update only one element :)
 * @apiParam {String} access_token user access token.
 * @apiParam category Item's category.
 * @apiParam details Item's details.
 * @apiParam container Item's container.
 * @apiParam color Item's color.
 * @apiParam size Item's size.
 * @apiParam freezer Item's freezer.
 * @apiParam location Item's location.
 * @apiParam name Item's name.
 * @apiParam expirationDate Item's expiration date.
 * @apiParam expirationInMonth Item's expiration in months.
 * @apiSuccess {Object} item Item's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Item not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ category, details, container, color, size, freezer, location, name, expirationDate, expirationInMonth }),
  update)

/**
 * @api {delete} /items/:id Delete item
 * @apiName DeleteItem
 * @apiGroup Item
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Item not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
