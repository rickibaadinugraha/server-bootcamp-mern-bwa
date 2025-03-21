// import
const Events = require("../../api/v1/events/model");
const { checkingImage } = require("./images");
const { checkingCategories } = require("./categories");
const { checkingTalents } = require("./talents");
const { NotFoundError, BadRequestError } = require("../../errors");
// const { path } = require("../../../app");
const { populate } = require("dotenv");
const { model } = require("mongoose");

const getAllEvents = async (req) => {
  const { keyword, category, talent, status } = req.query;
  let condition = { organizer: req.user.organizer };

  if (keyword) {
    condition = { ...condition, title: { $regex: keyword, $options: "i" } };
  }

  if (category) {
    condition = { ...condition, category: category };
  }

  if (talent) {
    condition = { ...condition, talent: talent };
  }

  if (["Draft", "Published"].includes(status)) {
    condition = {
      ...condition,
      statusEvent: status,
    };
  }

  const result = await Events.find(condition)
    .populate({
      path: "image",
      select: "_id name",
    })
    .populate({ path: "category", select: "_id name" })
    .populate({
      path: "talent",
      select: "_id name role image",
      populate: { path: "image", select: "_id name" },
    });

  return result;
};

const getOneEvents = async (req) => {
  const { id } = req.params;

  const result = await Events.findOne({
    _id: id,
    organizer: req.user.organizer,
  })
    .populate({ path: "image", select: "_id name" })
    .populate({ path: "category", select: "_id name" })
    .populate({
      path: "talent",
      select: "_id name role image",
      populate: { path: "image", select: "_id name" },
    });

  if (!result) throw new NotFoundError(`Not found event with id: ${id}`);

  return result;
};

const createEvents = async (req) => {
  const {
    title,
    date,
    about,
    tagline,
    venueName,
    keyPoint,
    statusEvent,
    tickets,
    image,
    category,
    talent,
  } = req.body;

  // search image, category dan talent with field id
  await checkingImage(image);
  await checkingCategories(category);
  await checkingTalents(talent);

  // search events with field name
  const check = await Events.findOne({ title });
  if (check) throw new BadRequestError("Event title already registered");

  const result = await Events.create({
    title,
    date,
    about,
    tagline,
    venueName,
    keyPoint,
    statusEvent,
    tickets,
    image,
    category,
    talent,
    organizer: req.user.organizer,
  });

  return result;
};

const updateEvents = async (req) => {
  const {
    title,
    date,
    about,
    tagline,
    venueName,
    keyPoint,
    statusEvent,
    tickets,
    image,
    category,
    talent,
  } = req.body;

  // search image, category & talent with field id
  await checkingImage(image);
  await checkingCategories(category);
  await checkingTalents(talent);

  const checkEvent = await Events.findOne({ _id: id });
  if (!checkEvent) throw new NotFoundError(`Not found event with id: ${id}`);

  // search events with field name
  const check = await Events.findOne({
    title,
    organizer: req.user.organizer,
    _id: { $ne: id },
  });
  if (check) throw new BadRequestError("Event title already registered");

  const result = await Events.findOneAndUpdate(
    { _id: id },
    {
      title,
      date,
      about,
      tagline,
      venueName,
      keyPoint,
      statusEvent,
      tickets,
      image,
      category,
      talent,
      organizer: req.user.organizer,
    },
    { new: true, runValidators: true }
  );

  // if (!result) throw new NotFoundError(`Not found events with id: ${id}`);
  return result;
};

const deleteEvents = async (req) => {
  const { id } = req.params;
  const result = await Events.findOne({
    _id: id,
    organizer: req.user.organizer,
  });

  if (!result) throw new NotFoundError(`Not found events with id: ${id}`);
  await result.remove();

  return result;
};

const changeStatusEvents = async (req, res, next) => {
  const { id } = req.params;
  const { statusEvent } = req.body;

  // search event based on id
  const checkEvent = await Events.findOne({
    _id: id,
    organizer: req.user.organizer,
  });

  if (!checkEvent) throw new NotFoundError(`Not found events with id : ${id}`);

  checkEvent.statusEvent = statusEvent;
  await checkEvent.save();

  return checkEvent;
};

module.exports = {
  getAllEvents,
  getOneEvents,
  createEvents,
  updateEvents,
  deleteEvents,
  changeStatusEvents,
};
