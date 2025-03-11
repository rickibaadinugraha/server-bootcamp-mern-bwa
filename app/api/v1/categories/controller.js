const { default: mongoose } = require("mongoose");
const Categories = require("./model");
const {
  getAllCategories,
  createCategories,
  getOneCategories,
} = require("../../../services/mongoose/categories");

const Create = async (req, res, next) => {
  try {
    const { name } = req.body;
    const result = await createCategories(req);

    res.status(201).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const Index = async (req, res, next) => {
  try {
    const result = await getAllCategories(req);

    res.status(200).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const Find = async (req, res, next) => {
  try {
    const result = await getOneCategories(req);

    res.status(200).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const Update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const result = await Categories.findOneAndUpdate(
      { _id: id },
      { name },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const Destroy = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Categories.findByIdAndDelete(id);

    res.status(200).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  Index,
  Create,
  Find,
  Update,
  Destroy,
};
