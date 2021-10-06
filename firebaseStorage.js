const express = require("express");
const app = express();
const multer = require("multer");
const upload = multer();

const firebaseStorage = require("./lib/firebase_storage");

const uuid = require("uuid");

app.post("/upload", upload.single("avatar"), async (req, res, next) => {
  const alloweFileType = ["image/png", "image/jpeg"];
  const splitNameFile = req.file.originalname.split(".");
  const formatFile = splitNameFile[splitNameFile.length - 1];

  if (alloweFileType.includes(req.file.mimetype)) {
    const image = await firebaseStorage.upload(
      req.file.buffer,
      `image/${uuid.v4()}.${formatFile}`
    );

    // todo something
    return res.status(200).json({
      status: 200,
      result: {
        image: image.image,
        url: image.publicUrl,
      },
    });
  }

  res.status(400).json({
    status: 400,
    message: "upload file failed",
  });
});

app.listen(3000, () => {
  console.log("Application running on port 3000");
});
