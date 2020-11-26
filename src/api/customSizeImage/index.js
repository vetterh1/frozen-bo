import { Router } from 'express'
import { token } from '../../services/passport'
import { GetCustomSizeImage, DeleteRelatedCustomSizeImages } from './controller'

const router = new Router()

/**
 * @api {get} /custom-size-image/:filename?MANDATORY_PARAMETERS Retrieve file
 * @apiName GetCustomSizeImage
 * @apiGroup CustomSizeImages
 * @apiPermission none
 * @apiParam {String} access_token user access token.
 * @apiParam {String} :filename of the picture, followed by MANDATORY query parameters (ex: ?type=item&width=230&height=230)
 * @apiSuccess {Object} file.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Item not found.
 */
router.get('/:filename',
  token({ required: true }),
  GetCustomSizeImage)



  /**
   * @api {delete} /custom-size-image/:filename Delete custom sized images related to filename
   * @apiName DeleteRelatedCustomSizeImages
   * @apiGroup CustomSizeImages
   * @apiPermission user
   * @apiParam {String} access_token user access token.
   * @apiParam {String} :filename related to the files we want to delete
   * @apiSuccess (Success 204) 204 No Content.
   * @apiError 404 Item not found.
   * @apiError 401 user access only.
   */
  router.delete('/:filename',
    token({ required: true }),
    DeleteRelatedCustomSizeImages)


  


export default router
