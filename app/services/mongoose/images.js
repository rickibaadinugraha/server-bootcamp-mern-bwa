const Images = require("../../api/v1/images/model");
const { NotFoundError } = require("../../errors");

// There two ways to upload image
// 1. two option, if null / not
const createImages = async (req) => {
  const result = await Images.create({
    name: req.file
      ? `uploads/${req.file.filename}`
      : "upload/avatar/default.jpg",
  });

  return result;
};

// 2. generate url first
const generateUrlImage = async (req) => {
  const result = `uploads/${req.file.filename}`;

  return result;
};

const checkingImage = async (id) => {
  const result = await Images.findOne({ _id: id });
  console.log(result);

  if (!result) throw new NotFoundError(`Not found image with id: ${id}`);

  return result;
};

module.exports = { createImages, checkingImage };
