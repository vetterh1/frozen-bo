import path from "path";
import sharp from "sharp";
import fs from "fs";
import { success, notFound } from "../../services/response/";
import { foldersPaths } from "../../config";

import stringifyOnce from '../../utils/stringifyOnce'
// import sizeInMB from '../../utils/sizeInMB';

const _sendFile = (path, filename, res, next) => {
  const options = {
    root: path,
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  }
  // console.log(`customSizeImage.GetCustomSizeImage options: ${stringifyOnce(options)}`)  
  res.sendFile(filename, options, (err) => {
    if (err) {
      console.error(`customSizeImage.GetCustomSizeImage Error sending ${path}/${filename} - err: ${stringifyOnce(err)}`);
      next(err);
    } else {
      console.debug(`customSizeImage.GetCustomSizeImage Sent ${path}/${filename}`);
    }
  });
}

export const GetCustomSizeImage = ({ params, query }, res, next) => {

  const filename = params.filename;
  const type = query.type || "item"; // item,...
  const width = query.width ? parseInt(query.width) : 300;
  const height = query.height ? parseInt(query.height) : 300;
  
  // console.log(`customSizeImage.GetCustomSizeImage params: ${stringifyOnce(params)}`)
  // console.log(`customSizeImage.GetCustomSizeImage query: ${stringifyOnce(query)}`)
  // console.log(`customSizeImage.GetCustomSizeImage width: ${stringifyOnce(width)}`)
  // console.log(`customSizeImage.GetCustomSizeImage height: ${stringifyOnce(height)}`)
  
  const folderMainPicture = path.join(
    __dirname, 
    foldersPaths.relativePaths.fromController, 
    foldersPaths.pictures,
    type + "s" // use plural (ex: item + s = items)
  );
  const mainPictureFilename = path.join(folderMainPicture, filename);
  // console.log(`customSizeImage.GetCustomSizeImage sharp mainPictureFilename: ${mainPictureFilename}`)

  const folderCustomSizeImage = path.join(
    __dirname, 
    foldersPaths.relativePaths.fromController, 
    foldersPaths.customSizeImages,
  );
  const filenameWithoutExtension = filename.replace(/\.[^/.]+$/, "");
  const filenameWithOptions = `${filenameWithoutExtension}__${width}__${height}.jpg`
  const customSizeImageFilename = path.join(folderCustomSizeImage, filenameWithOptions);
  // console.log(`customSizeImage.GetCustomSizeImage sharp customSizeImageFilename: ${customSizeImageFilename}`)


  // Look for the custom file in the Custom size image folder:
  if (customSizeImageFilename && fs.existsSync(customSizeImageFilename)) {
    // Custom file exists: send it!
    _sendFile (folderCustomSizeImage, filenameWithOptions, res, next);
  } else {

    if (mainPictureFilename && fs.existsSync(mainPictureFilename)) {

      // Custom file does NOT exists
      // But original files DOES exist:
      // Create custom file, save it locally (cache), then send it!

      // Generate the file from the main picture
      try {
        sharp(mainPictureFilename)
        .resize(width, width)
        .toFile(customSizeImageFilename, (err, info) => { 
          console.debug(`customSizeImage.GetCustomSizeImage Created image ${customSizeImageFilename} - err: ${stringifyOnce(err)} - info: ${stringifyOnce(info)}`);
          _sendFile (folderCustomSizeImage, filenameWithOptions, res, next);
        });
      } catch (error) {
        console.error(`customSizeImage.GetCustomSizeImage Error creating ${mainPictureFilename} - err: ${stringifyOnce(error)}`);
        next(error);      
      }
    } else {
      console.error(`customSizeImage.GetCustomSizeImage Could not create from unknown file ${mainPictureFilename}`);
      next();    
    }
  }
};
  


//
// Delete all the custom size images related to the filename
//


export const deleteRelatedCustomSizeImages = (filename) => {
  if(!filename) return;
  
  console.log("DeleteRelatedCustomSizeImages: ", filename);
  const filenameWithoutExtension = filename?.replace(/\.[^/.]+$/, "");
  const regexpSearch = new RegExp(`^${filenameWithoutExtension}`)
  const folderCustomSizeImage = path.join(
    __dirname, 
    foldersPaths.relativePaths.fromController, 
    foldersPaths.customSizeImages,
  );

  fs.readdir(folderCustomSizeImage, (error, files) => {
    if (error) throw error;
    // files.map( name => console.log("DeleteRelatedCustomSizeImages - file in folder: ", name));
    const relatedFiles = files.filter(name => regexpSearch.test(name))
    relatedFiles.map( name => console.log("DeleteRelatedCustomSizeImages - relatedFiles: ", name));
    relatedFiles.forEach(name => {
      const fileToDel = path.join(folderCustomSizeImage, name);
      console.log("DeleteRelatedCustomSizeImages - deleting: ", fileToDel)
      fs.unlinkSync(fileToDel)
    });
  });
};


export const DeleteRelatedCustomSizeImages = ({ params }, res, next) => {
  try {
    const filename = params.filename;
    deleteRelatedCustomSizeImages(filename);
    console.log("DeleteRelatedCustomSizeImages - done successfull!: ");
    success(res, 204)({deleted: true});
  } catch (error) {
    console.error(`DeleteRelatedCustomSizeImages failed: ${error}`);
    next();
  }
};
  