//
//
//   DEPRECATED   -    USE FRONT SIDE RESIZE TO GENERATE THUMBNAIL
//
//   See items/index.js and its use of multer
//
//











// import fs from 'fs-extra';
// import config from 'config';
import path from 'path';
import Jimp from 'jimp';
// import klaw from 'klaw';
// import { staticFolders } from '../config'


global.regenerateAllThumbnailsInfo = {
  io: null,
  regenerateAllProcessing: false,
  timeStart: null,
  timeStartProcessing: null,
  timeProcessingPrevious: null,
  nbFilesOK: 0,
  nbFilesKO: 0,
};


export function generateThumbnail(picturePath, folderThumbnails, callback = null, width = 640, height = 480, quality = 60, stream = null) {
  const fileName = path.basename(picturePath);
  const thumbnailCompleteFilePath = path.join(folderThumbnails, fileName);
  Jimp.read(picturePath).then((picture) => {
    picture.scaleToFit(width, height)              // resize
      .quality(quality)                            // set JPEG quality
      .write(thumbnailCompleteFilePath, () => {
        // Stats
        if (stream) {
          const _timeProcessing = Date.now();
          const durationTotal = _timeProcessing - global.regenerateAllThumbnailsInfo.timeStart;
          const duration = _timeProcessing - global.regenerateAllThumbnailsInfo.timeProcessingPrevious;
          global.regenerateAllThumbnailsInfo.timeProcessingPrevious = _timeProcessing;
          global.regenerateAllThumbnailsInfo.nbFilesOK += 1;
          console.info(`generateThumbnail ${duration}ms for #${global.regenerateAllThumbnailsInfo.nbFilesOK}: ${fileName}`);

          // Update browser
          global.regenerateAllThumbnailsInfo.io.emit('regenerateAllThumbnails.OK', { fileName, duration, durationTotal, nbFilesOK: global.regenerateAllThumbnailsInfo.nbFilesOK, nbFilesKO: global.regenerateAllThumbnailsInfo.nbFilesKO });

          // Resume processing (of next image)
          stream.resume();
        } else {
          console.info(`generateThumbnail - ${thumbnailCompleteFilePath} OK`);
        }
        if (callback) { callback('OK'); }
      });
  }).catch((errJimp) => {
    // Stats
    if (stream) {
      const _timeProcessing = Date.now();
      const durationTotal = _timeProcessing - global.regenerateAllThumbnailsInfo.timeStart;
      const duration = _timeProcessing - global.regenerateAllThumbnailsInfo.timeProcessingPrevious;
      global.regenerateAllThumbnailsInfo.timeProcessingPrevious = _timeProcessing;
      global.regenerateAllThumbnailsInfo.nbFilesKO += 1;
      global.regenerateAllThumbnailsInfo.io.emit('regenerateAllThumbnails.KO', { fileName, duration, durationTotal, nbFilesOK: global.regenerateAllThumbnailsInfo.nbFilesOK, nbFilesKO: global.regenerateAllThumbnailsInfo.nbFilesKO });
      stream.resume();
    }
    console.error(`! generateThumbnail - ${fileName} failed (2): `, errJimp);
    if (callback) { callback('KO', errJimp); }
  });
}

/*
// test with curl:
// curl --data "picturePath=toto" http://localhost:8080/util/generateOneThumbnail

export function generateOneThumbnail(req, res) {
  if (!req.body || !req.body.picturePath) {
    const error = { status: 'error', message: '! itemController.updateItem failed! - no body or picturePath' };
    if (!req.body) error.message += '... no req.body!';
    if (req.body && !req.body.picturePath) error.message += '... no req.body.picturePath!';
    res.status(400).json(error);
  } else {

    const folderThumbnails = path.join(__dirname, staticFolderss.relativePaths.fromUtil, staticFolderss.thumbnails);

    generateThumbnail(req.body.picturePath, folderThumbnails, null, (code, details) => {
      res.json({ code, details });
    });
  }
}


export function regenerateAll(req, res) {
  // Do not regenerate if a similar process is already running!
  if (global.regenerateAllThumbnailsInfo.regenerateAllProcessing) {
    console.error('! generateThumbnails.regenerateAll - Processing already in progress');
    res.json({ error: 'Processing already in progress...' });
    return;
  }
  global.regenerateAllThumbnailsInfo.regenerateAllProcessing = true;
  global.regenerateAllThumbnailsInfo.timeStart = Date.now();


  // Real time sockets init
  global.regenerateAllThumbnailsInfo.io = req.app.get('socketio');
  // console.log('socket io req response: ', global.regenerateAllThumbnailsInfo.io);
  global.regenerateAllThumbnailsInfo.io.on('connection', (socket) => {
    console.info('generateThumbnails.regenerateAll - a user connected');
    global.regenerateAllThumbnailsInfo.io.emit('connected');

    socket.on('disconnect', () => {
      console.info('generateThumbnails.regenerateAll - a user disconnected');
    });
  });

  // Folder init
  const folderStatic = config.get('storage.static');
  const folderPictures = path.join(__dirname, '..', folderStatic, '/pictures');
  const folderThumbnails = path.join(__dirname, '..', folderStatic, '/thumbnails');
  const folderThumbnailsBackup = path.join(__dirname, '..', folderStatic, `/thumbnails.save.${Date.now()}`);

  // Rename thumbnails folder
  try {
    fs.renameSync(folderThumbnails, folderThumbnailsBackup);
  } catch (err) {
    if (err && err.code === 'ENOENT') {
      console.info(`generateThumbnails.regenerateAll could not rename ${folderThumbnails} to ${folderThumbnailsBackup}: source does not exist!`);
    } else {
      console.error(`generateThumbnails.regenerateAll failed to rename ${folderThumbnails} to ${folderThumbnailsBackup}: ${err.code}`);
    }
  }

  // Recreate thumbnails folder
  try {
    fs.mkdirSync(folderThumbnails);
  } catch (err) {
    console.error(`generateThumbnails.regenerateAll re-create ${folderThumbnails}: ${err}`);
  }
  global.regenerateAllThumbnailsInfo.timeStartProcessing = Date.now();
  console.info(`generateThumbnails.regenerateAll duration init = ${global.regenerateAllThumbnailsInfo.timeStartProcessing - global.regenerateAllThumbnailsInfo.timeStart}`);

  // Send empty body to browser...
  // the updates will come through socket emit messages
  // and displayed in the browser
  res.json({ items: null });
  global.regenerateAllThumbnailsInfo.io.emit('regenerateAllThumbnails.start');


  // Scan the folders
  // and process each file
  global.regenerateAllThumbnailsInfo.nbFilesOK = 0;
  global.regenerateAllThumbnailsInfo.nbFilesKO = 0;
  global.regenerateAllThumbnailsInfo.timeProcessingPrevious = global.regenerateAllThumbnailsInfo.timeStartProcessing;

  klaw(folderPictures)
    .on('data', function (item) {
      if (!item.stats.isDirectory()) {
        // Pause processing of images until current file processed
        this.pause();

        // Process file (resize, reduce quality, save to thumbsnail folder)
        generateThumbnail(this, item.path, folderThumbnails);
      }
    })
    .on('end', function () {
      const durationTotal = Date.now() - global.regenerateAllThumbnailsInfo.timeStart;
      console.info(`generateThumbnails.regenerateAll ended in ${Math.round(durationTotal / 1000)} seconds for ${global.regenerateAllThumbnailsInfo.nbFilesOK} pictures (avg: ${Math.round(durationTotal / global.regenerateAllThumbnailsInfo.nbFilesOK)} ms)`);
      global.regenerateAllThumbnailsInfo.io.emit('regenerateAllThumbnails.done', { durationTotal, nbFilesOK: global.regenerateAllThumbnailsInfo.nbFilesOK, nbFilesKO: global.regenerateAllThumbnailsInfo.nbFilesKO });

      // Another regenarate is allowed
      // now that this processing is over
      global.regenerateAllThumbnailsInfo.regenerateAllProcessing = false;
    });
}
*/