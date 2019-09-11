const express = require('express');
const multer = require('multer');
const fs = require('fs');

const uploadsRouter = express.Router();
const multerStorage = multer({
  dest: 'public/',
});
uploadsRouter.post('/photos', multerStorage.single('image'), async (req, res) => {
  console.log(req.file);

  // rename
  const fileExt = req.file.originalname.split('.');
  const ext = fileExt[fileExt.length - 1];
  fs.renameSync(req.file.path, `public/${req.file.filename}.${ext}`);

  // return url
  res.status(200).json({
    success: true,
    data: `/${req.file.filename}.${ext}`,
  });
});

module.exports = uploadsRouter;