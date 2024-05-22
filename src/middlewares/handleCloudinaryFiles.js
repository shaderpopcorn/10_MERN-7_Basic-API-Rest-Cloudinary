const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "bookstore",
    allowFormats: ["jpg", "jpeg", "png", "gif"],
  },
});

const uploadFile = multer({ storage });

const deleteFile = (imgUrl) => {
  const urlSplit = imgUrl.split("/");
  const nameSplit = urlSplit.at(-1).split(".");
  const folderSplit = urlSplit.at(-2);
  const public_id = `${folderSplit}/${nameSplit[0]}`;

  cloudinary.uploader.destroy(public_id),
    () => {
      console.log(`Image deleted at: ${public_id}`);
    };
};

module.exports = { uploadFile, deleteFile };
