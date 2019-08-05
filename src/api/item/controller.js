import path from 'path';
import fs from 'fs';
import { success, notFound, authorOrAdmin } from '../../services/response/'
import Item from './model'
import { staticFolders } from '../../config'
// import * as GenerateThumbnails from '../../utils/generateThumbnails';

// import stringifyOnce from '../../utils/stringifyOnce'
// import sizeInMB from '../../utils/sizeInMB';


const generateCode = async (category, user) => {
  try {
    // Find next id for this category:
    let nextId = 0;
    if(user.nextIds) {
      const nextIdString = user.nextIds.get(category);
      if(nextIdString) nextId = parseInt(nextIdString);
    }
    else 
      user.nextIds = {};
    if(!nextId) nextId = 0;

    // Generate the code:
    const code = `${category}${user.homeOrder}${nextId}`

    // Increment the nextId and save it:
    user.nextIds.set(category, nextId + 1);
    const res = await user.save()

    return code;
    
  } catch (error) {
    console.error('item generateCode error:', error);
    return null;  
  }

}





export const create = async ({ user, bodymen: { body } }, res, next) => {
  console.info('|--- MONGO SAVE ---|--- ITEMS ---| Items.create');
  const code = await generateCode(body.category, user);
  Item.create({ ...body, code, user: user.id, home: user.home })
    // .then((item) => {console.log('item: ', item); return item})
    .then((item) => item.view(true))
    .then(success(res, 201))
    .catch(next)
}




export const index = ({ user, querymen: { query, select, cursor } }, res, next) =>
  Item.find({home: user.home, removed: false}, select, cursor)
    // .then((items) => {console.error('items=', items, ' \n - user.id: ', user.id ); return items})
    // .populate('user')
    .then((items) => items.map((item) => item.view()))
    .then(success(res))
    .catch(next)

export const removed = ({ user, querymen: { query, select, cursor } }, res, next) =>
    Item.find({home: user.home, removed: true}, select, cursor)
      // .then((items) => {console.error('items=', items, ' \n - user.id: ', user.id ); return items})
      // .populate('user')
      .then((items) => items.map((item) => item.view()))
      .then(success(res))
      .catch(next)
  


export const show = ({ params }, res, next) =>
  Item.findById(params.id)
    // .populate('user')
    .then(notFound(res))
    .then((item) => item ? item.view() : null)
    .then(success(res))
    .catch(next)



export const update = ({ user, bodymen: { body }, params }, res, next) => {
  Item.findById(params.id)
    .then(notFound(res))
    // .then(authorOrAdmin(res, user, 'user')) <-- other users from the same home should be able to update! 
    .then((item) => {
      let dirty = false;
      const updatedProperties = Object.getOwnPropertyNames(body);
      updatedProperties.forEach(element => {
        if(body[element]) {
          if( item[element] !== body[element] ) {
            dirty = true;
            item[element] = body[element]
            // console.debug('item update:', element, body[element]);
          }
        }
      });
      if(dirty) {
        console.info('|--- MONGO SAVE ---|--- ITEMS ---| Items.update: ', params.id);
        return item.save()
      }
    })    
    .then((item) => item ? item.view(true) : null)
    .then(success(res))
    .catch(next)
  }





export const updateBinaryPicture = (req, res) => {
  // const { body , params, user, headers } = req;
  // console.log("updateBinaryPicture: headers['content-length']=", sizeInMB(headers['content-length']));
  // console.log(`updateBinaryPicture: id: ${req.body.id}, token: ${stringifyOnce(req.body.access_token)} - files: ${stringifyOnce(req.files)} - size: ${sizeInMB(req.headers['content-length'])}`);

  Item.findById(req.body.id)
    .then(notFound(res))
    // .then(authorOrAdmin(res, user, 'user')) <-- other users from the same home should be able to update! 
    .then((item) => {

      // Delete previon picture & thumbnail
      if(item.pictureName !== req.files[0].originalname) {
        const folderPictures = path.join(__dirname, staticFolders.relativePaths.fromController, staticFolders.pictures, '/items');
        const pictureName = item.pictureName ? path.join(folderPictures, item.pictureName) : null;
        const thumbnailName = item.thumbnailName ? path.join(folderPictures, item.thumbnailName) : null;
        if (item.pictureName && fs.existsSync(pictureName)) fs.unlinkSync(pictureName);
        if (item.thumbnailName && fs.existsSync(thumbnailName)) fs.unlinkSync(thumbnailName);
      }

      // Store the new names in the item & save it
      item.pictureName = req.files[0].originalname;
      item.thumbnailName = req.files[1].originalname;
      item.updatedAt = Date.now();

      console.info('|--- MONGO SAVE ---|--- ITEMS ---| Items.updateBinaryPicture: ', req.body.id, item.pictureName, item.thumbnailName);
      return item.save()
    })    
    .then((item) => item ? item.view(true) : null)
    .then(success(res))
  }

  


export const remove = ({ user, params }, res, next) => {
    Item.findById(params.id)
      .then(notFound(res))
      // .then(authorOrAdmin(res, user, 'user'))     <-- other users from the same home should be able to remove! 
      .then((item) => {
          item.removed = true;
          return item.save()
      })    
      .then((item) => item ? item.view(true) : null)
      .then(success(res))
      .catch(next)
    }
  
  
  



export const destroy = ({ user, params }, res, next) => {
  console.info('|--- MONGO SAVE ---|--- ITEMS ---| Items.destroy: ', params.id);
  Item.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((item) => item ? item.remove() : null)
    .then(success(res, 204))
    .catch(next)
}