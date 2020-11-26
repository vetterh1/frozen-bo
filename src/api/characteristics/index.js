import { Router } from 'express'
import { success } from '../../services/response/'
import { itemCharacteristics } from '../../utils/itemCharacteristics'
import { token } from '../../services/passport'
const router = new Router()


/**
 * @api {get} /characteristics Retrieve item characteristics
 * @apiName RetrieveCharacteristics
 * @apiGroup Characteristics
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object[]} itemCharacteristics List of item characteristics.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  (b, res) => { success(res, 200)(itemCharacteristics); }  
)


export default router
