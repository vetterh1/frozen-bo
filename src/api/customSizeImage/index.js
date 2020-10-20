import { Router } from 'express'
import { token } from '../../services/passport'
import { GetCustomSizeImage, DeleteRelatedCustomSizeImages } from './controller'
// import { foldersPaths } from '../../config'
// import path from 'path';





  // // Serve static assets (pictures,...)
  // const folderStaticAbsolute = path.join(__dirname, foldersPaths.relativePaths.fromExpress, foldersPaths.static);
  // if (env === 'production' || env === 'development')
  //   console.info(`Public (static) files should be here: ${folderStaticAbsolute}`);
  // // app.use('/public', express.static(folderStaticAbsolute), serveIndex(folderStaticAbsolute, {'icons': true}));
  // app.use('/static', express.static(folderStaticAbsolute));



const router = new Router()

/**
 * @api {get} /custom-size-image/:type/:filename Retrieve file
 * @apiName GetCustomSizeImage
 * @apiGroup CustomSizeImages
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam {String} :filename of the picture, followed by query parameters in option (ex: ?type=item&width=230&height=230)
 * @apiSuccess {Object} file.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Item not found.
 * @apiError 401 user access only.
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
