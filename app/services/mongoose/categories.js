const req = require("express/lib/request");
const Categories = require("../../api/v1/categories/model");
const { BadRequestError, NotFoundError } = require("../../errors");

const getAllCategories = async (req) => {
  const result = await Categories.find({ organizer: req.user.organizer });

  return result;
};

const getOneCategories = async (req) => {
  const { id } = req.params;
  const result = await Categories.findOne({
    _id: id,
    organizer: req.user.organizer,
  });

  if (!result) throw new NotFoundError(`There is no category with id: ${id}`);
  return result;
};

const createCategories = async (req) => {
  const { name } = req.body;

  const check = await Categories.findOne({
    name,
    organizer: req.user.organizer,
  });
  if (check) throw new BadRequestError("Categoy name has been created");

  const result = await Categories.create({
    name,
    organizer: req.user.organizer,
  });

  return result;
};

const updateCategories = async (req) => {
  const { id } = req.params;
  const { name } = req.body;

  const check = await Categories.findOne({
    name,
    organizer: req.user.organizer,
    _id: { $ne: id },
  });

  if (check) throw new BadRequestError("Category name duplicate");

  const result = await Categories.findOneAndUpdate(
    { _id: id },
    { name },
    { new: true, runValidators: true }
  );

  if (!result) throw new NotFoundError(`Not found category with id: ${id}`);

  return result;
};

const deleteCategories = async (req) => {
  const { id } = req.params;

  const result = await Categories.findOne({
    _id: id,
    organizer: req.user.organizer,
  });
  if (!result) throw new NotFoundError(`Not found category with id: ${id}`);

  await result.remove();
  return result;
};
const checkingCategories = async (id) => {
  const result = await Categories.findOne({ _id: id });

  if (!result) throw new NotFoundError(`Not found category with id: ${id}`);
  return result;
};

module.exports = {
  getAllCategories,
  createCategories,
  getOneCategories,
  deleteCategories,
  checkingCategories,
};
