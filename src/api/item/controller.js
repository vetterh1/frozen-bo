import path from "path";
import fs from "fs";
import { success, notFound, authorOrAdmin } from "../../services/response/";
import Item from "./model";
import {deleteRelatedCustomSizeImages} from "../customSizeImage/controller";
import { env, foldersPaths } from "../../config";

// import stringifyOnce from '../../utils/stringifyOnce'
// import sizeInMB from '../../utils/sizeInMB';

const generateCode = async (category, user) => {
  try {
    // Find next id for this category:
    let nextId = 0;
    if (user.nextIds) {
      const nextIdString = user.nextIds.get(category);
      if (nextIdString) nextId = parseInt(nextIdString);
    } else user.nextIds = {};
    if (!nextId) nextId = 0;

    // Generate the code:
    const code = `${category}${user.homeOrder}${nextId}`;

    // Increment the nextId and save it:
    user.nextIds.set(category, nextId + 1);
    const res = await user.save();

    return code;
  } catch (error) {
    console.error("item generateCode error:", error);
    return null;
  }
};

export const create = async ({ user, bodymen: { body } }, res, next) => {
  if (env === "production" || env === "development")
    console.info("|--- MONGO SAVE ---|--- ITEMS ---| Items.create");
  const code = await generateCode(body.category, user);
  Item.create({ ...body, code, user: user.id, home: user.home })
    // .then((item) => {console.debug('item: ', item); return item})
    .then(item => item.view(true))
    .then(success(res, 201))
    .catch(next);
};

//
// Returns ALL the items for this user, including the old ones
//

export const index = ({ user }, res, next) =>
  Item.find({ home: user.home })
    // Item.find({home: user.home, removed: false})
    // .then((items) => {console.error('items=', items, ' \n - user.id: ', user.id ); return items})
    // .populate('user')
    .then(items => items.map(item => item.view()))
    .then(success(res))
    .catch(next);

export const removed = ({ user }, res, next) =>
  Item.find({ home: user.home, removed: true })
    // .then((items) => {console.error('items=', items, ' \n - user.id: ', user.id ); return items})
    // .populate('user')
    .then(items => items.map(item => item.view()))
    .then(success(res))
    .catch(next);

export const show = ({ params }, res, next) =>
  Item.findById(params.id)
    // .populate('user')
    .then(notFound(res))
    .then(item => (item ? item.view() : null))
    .then(success(res))
    .catch(next);

export const update = ({ user, bodymen: { body }, params }, res, next) => {
  Item.findById(params.id)
    .then(notFound(res))
    .then(item => {
      // User should belong to the same home!
      if (user.home !== item.home) return res.status(401).end();

      let dirty = false;
      const updatedProperties = Object.getOwnPropertyNames(body);
      updatedProperties.forEach(element => {
        if (body[element] !== undefined) {
          if (item[element] !== body[element]) {
            dirty = true;
            item[element] = body[element];
            // console.debug('item update:', element, body[element]);
          }
        }
      });
      if (dirty) {
        if (env === "production" || env === "development")
          console.info(
            "|--- MONGO SAVE ---|--- ITEMS ---| Items.update: ",
            params.id
          );
        return item.save();
      }
    })
    .then(item => (item ? item.view(true) : null))
    .then(success(res))
    .catch(next);
};

// Note on thumbnail: This methode only duplicates the main image. the thumbnails will be generated on-th-fly when needed
export const duplicate = async ({ user, body, params }, res, next) => {
  if (env === "production" || env === "development")
    console.info(
      "|--- MONGO SAVE ---|--- ITEMS ---| Items.duplicate: ",
      params.id
    );

  /* ex of body: {
    access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjZWE5NTEwYTE5YTY3MGYwODMzYmVjZSIsImlhdCI6MTU4MzI0Mzc2Nn0.EsSu8ZmZ8qgThMK720qkA_zWT0m1VPxS907FNJLUpgg',
    duplicated_picture_name: '5da9c9b0f3fc6403dd8f88cf-picture-1584269726701.jpg',
  } */

  Item.findById(params.id)
    .then(notFound(res))
    .then(item => (item ? item.view() : null))
    .then(async item => {
      // User should belong to the same home!
      if (user.home !== item.home) return res.status(401).end();

      const folderPictures = path.join(
        __dirname,
        foldersPaths.relativePaths.fromController,
        foldersPaths.pictures,
        "/items"
      );
      const originalPictureName = item.pictureName
        ? path.join(folderPictures, item.pictureName)
        : null;
      const newPictureName = body.duplicated_picture_name
        ? path.join(folderPictures, body.duplicated_picture_name)
        : null;
      let copyPossible = true;

      if (originalPictureName && fs.existsSync(originalPictureName)) {
        if (newPictureName) {
          console.log(
            "_duplicatePicture - picture : ",
            originalPictureName,
            " --> ",
            newPictureName
          );
          fs.copyFileSync(originalPictureName, newPictureName);
        } else {
          console.log(
            "_duplicatePicture - no picture duplicate: new picture name null"
          );
          copyPossible = false;
        }
      } else {
        console.log(
          "_duplicatePicture - no picture duplicate: original does not exist",
          originalPictureName
        );
        copyPossible = false;
      }

      const code = await generateCode(item.category, user);
      // console.info("Items.duplicate: originalItem=", item);
      const newItemBeforeSave = {
        ...item,
        _id: undefined,
        id: undefined,
        code,
        user: user.id,
        home: user.home,
        pictureName:
          copyPossible && body.duplicated_picture_name
            ? body.duplicated_picture_name
            : null,
      };
      // console.info("Items.duplicate: newItemBeforeSave=", newItemBeforeSave);
      const newItem = await Item.create(newItemBeforeSave);
      // console.info("Items.duplicate: newItem=", newItem);

      return newItem;
    })
    .then(item => (item ? item.view(true) : null))
    .then(success(res, 201))
    .catch(next);
};

export const updateBinaryPicture = ({ body, file, user, headers }, res) => {
  // console.log("updateBinaryPicture: user=", user);
  // console.log("updateBinaryPicture: headers['content-length']=", sizeInMB(headers['content-length']));
  // console.log(`updateBinaryPicture: id: ${body.id}, token: ${stringifyOnce(body.access_token)} - files: ${stringifyOnce(files)} - size: ${sizeInMB(headers['content-length'])}`);

  Item.findById(body.id)
    .then(notFound(res))
    .then(item => {
      // User should belong to the same home!
      // if(user.home !== item.home) return res.status(401).end()   <--- TODO  user is not passed as it's FORM-DATA and not form-urlencoded

      // Delete previon picture
      if(item.pictureName && item.pictureName !== file.originalname) {
        const folderPictures = path.join(
          __dirname,
          foldersPaths.relativePaths.fromController,
          foldersPaths.pictures,
          "/items"
        );
        const pictureFullPath = path.join(folderPictures, item.pictureName);
        if(fs.existsSync(pictureFullPath))
          fs.unlinkSync(pictureFullPath);

        // Delete all the custom size images (former thumbnails)
        deleteRelatedCustomSizeImages(pictureFullPath);

      }

      // Store the new names in the item & save it
      item.pictureName = file.originalname;
      item.updatedAt = Date.now();

      if (env === "production" || env === "development")
        console.info(
          "|--- MONGO SAVE ---|--- ITEMS ---| Items.updateBinaryPicture: ",
          body.id,
          item.pictureName
        );
      return item.save();
    })
    .then(item => (item ? item.view(true) : null))
    .then(success(res));
};

export const remove = ({ user, body, params }, res, next) => {
  Item.findById(params.id)
    .then(notFound(res))
    .then(item => {
      // User should belong to the same home!
      if (user.home !== item.home) return res.status(401).end();

      // If no size parameter: remove all
      // otherwise don't mark as removed, but adjust the new size
      if (body["size"]) {
        item["removed"] = false;
        item["size"] = parseInt(body["size"]);
      } else {
        item["removed"] = true;
      }
      return item.save();
    })
    .then(item => (item ? item.view(true) : null))
    .then(success(res))
    .catch(next);
};

export const destroy = ({ user, params }, res, next) => {
  if (env === "production" || env === "development")
    console.info(
      "|--- MONGO SAVE ---|--- ITEMS ---| Items.destroy: ",
      params.id
    );
  Item.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, "user"))
    .then(item => (item ? item.remove() : null))
    .then(success(res, 204))
    .catch(next);
};
