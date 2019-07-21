//
//
//  FOR TESTING ONLY, NOT ACTIVATED BY DEFAULT, SEE ./INDEX.JS TO ACTIVATE
//
//







var express = require('express')
var router = express.Router()

var multer  =   require('multer');
var upload = multer({ dest: 'static/pictures/items' }).single('picture');

import stringifyOnce from '../../utils/stringifyOnce'
import sizeInMB from '../../utils/sizeInMB'

// import { updateBinaryPicture } from '../../api/item/controller'


// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})



// define the home page route
router.get('/', function (req, res) {
  res.send('Binaries special router')
})

// POST method route
router.post('/', function (req, res) {
  res.send(`POST request to the homepage : ${stringifyOnce(req)}`);
})


router.post('/picturetest', upload, function (req, res, next) {
  res.send(`POST picture : id: ${req.body.id}, token: ${stringifyOnce(req.body.access_token)} - file: ${stringifyOnce(req.file)} - size: ${sizeInMB(req.headers['content-length'])}`);
})


router.post('/picturetest2', function (req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      res.send(`POST test - MulterError : ${stringifyOnce(err)}`);

    } else if (err) {
      // An unknown error occurred when uploading.
      res.send(`POST test - unknown error : ${stringifyOnce(err)}`);
    }
 
    // Everything went fine.
    if(!err) res.send(`POST test - OK`);

  })
})


// router.post('/picture', 
//   // token({ required: true }),
//   upload.single(), 
//   function (req, res, next) {
//     console.log(`POST picture : id: ${req.body.id}, token: ${stringifyOnce(req.body.access_token)} - file: ${stringifyOnce(req.file)} - size: ${sizeInMB(req.headers['content-length'])}`);
//   },
//   updateBinaryPicture)
  



module.exports = router