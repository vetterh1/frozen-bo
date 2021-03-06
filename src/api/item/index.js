import { Router } from 'express'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy, removed, remove, duplicate, updateBinaryPicture } from './controller'
import { schema } from './model'
import { foldersPaths } from '../../config'
import path from 'path';

// export Item, { schema } from './model'
// import stringifyOnce from  '../../utils/stringifyOnce'
// import sizeInMB from  '../../utils/stringifyOnce'


//
// Configure multer, the multipart middleware for form-data posts used to store item pictures
// 
const folderPictures = path.join(__dirname, foldersPaths.relativePaths.fromController, foldersPaths.pictures, '/items');
const multer  =   require('multer');
const storage = multer.diskStorage({
  destination: folderPictures,
  filename: (req, file, callback) => {
    callback(null, file.originalname)
  }
});
const upload = multer({ storage: storage })


const router = new Router()
const { category, details, container, color, size, freezer, location, description, expirationDate, expirationInMonth, picture } = schema.tree

/**
 * @api {post} /items Create item
 * @apiName CreateItem
 * @apiGroup Item
 * @apiPermission user
 * @apiDescription Create a new item, attached to the user and its home
 * @apiDescription It means the user should exist and have a valid home
 * @apiParam {String} access_token user access token.
 * @apiParam category Item's category.
 * @apiParam details Item's details.
 * @apiParam container Item's container.
 * @apiParam color Item's color.
 * @apiParam size Item's size.
 * @apiParam freezer Item's freezer.
 * @apiParam location Item's location.
 * @apiParam description Item's description.
 * @apiParam expirationDate Item's expiration date.
 * @apiParam expirationInMonth Item's expiration in months.
 * @apiSuccess {Object} item Item's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Item not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ category, details, container, color, size, freezer, location, description, expirationDate, expirationInMonth }),
  create)

/**
 * @api {get} /items Retrieve all items including the removed ones
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
  index)


/**
 * @api {get} /removed Retrieve removed items
 * @apiName removedItems
 * @apiGroup Item
 * @apiDescription Find all the removed items for the home of the current user
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} items List of items.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/removed',
  token({ required: true }),
  removed)


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
 * @api {put} /items/picture Update item's picture
 * @apiName UpdatePicture
 * @apiGroup Item
 * @apiPermission none yet, should be user
 * @apiDescription Update the picture of an item through a form-data multipart call
 * @apiDescription (!) the picture name MUST be passed with the pictures (in originalname)
 * @apiParam in multipart {String} id : item id.
 * @apiParam in multipart {String} access_token : user access token.
 * @apiParam in multipart {String} picture : item picture
 * @apiSuccess {Object} item Item's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Item not found.
 * @apiError 401 user access only.
 */

router.post('/picture', 
  // token({ required: true }),  <--- TODO  user is not passed as it's FORM-DATA and not form-urlencoded
  upload.single('picture'), 
  updateBinaryPicture)
  


/**
 * @api {put} /items/:id/duplicate Duplicate item
 * @apiName UpdateItem
 * @apiGroup Item
 * @apiPermission user
 * @apiDescription It's possible to duplicate only one element :)
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} duplicated item's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Item not found.
 * @apiError 401 user access only.
 */
router.put('/:id/duplicate',
  token({ required: true }),
  body({}),
  duplicate)

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
 * @apiParam description Item's description.
 * @apiParam expirationDate Item's expiration date.
 * @apiParam expirationInMonth Item's expiration in months.
 * @apiSuccess {Object} item Item's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Item not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ category, details, container, color, size, freezer, location, description, expirationDate, expirationInMonth }),
  update)

/**
 * @api {post} /items/remove/:id Remove item
 * @apiName RemoveItem
 * @apiGroup Item
 * @apiPermission user
 * @apiDescription If no size parameter: remove all
 * @apiDescription otherwise don't mark as removed, but adjust the new size
 * @apiParam size Item's new size or nothing (for remove all)
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Item not found.
 * @apiError 401 user access only.
 */
router.post('/remove/:id',
  token({ required: true }),
  remove)


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
