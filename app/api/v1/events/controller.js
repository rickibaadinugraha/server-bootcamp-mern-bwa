const {
  getAllEvents,
  getOneEvents,
  createEvents,
  updateEvents,
  deleteEvents,
  changeStatusEvents,
} = require("../../../services/mongoose/events");
const { StatusCodes } = require("http-status-codes");

const Create = async (req, res, next) => {
  try {
    const result = await createEvents(req);

    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const Update = async (req, res, next) => {
  try {
    const result = await updateEvents(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const Index = async (req, res, next) => {
  try {
    const result = await getAllEvents(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const Find = async (req, res, next) => {
  try {
    const result = await getOneEvents(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const Destroy = async (req, res, next) => {
  try {
    const result = await deleteEvents(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const changeStatus = async (req, res, next) => {
  try {
    const result = await changeStatusEvents(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  Create,
  Update,
  Index,
  Find,
  Destroy,
  changeStatus,
};
