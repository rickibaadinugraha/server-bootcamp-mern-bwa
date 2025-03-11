const {
  getAllPayments,
  getOnePayments,
  createPayments,
  updatePayments,
  deletePayments,
} = require("../../../services/mongoose/payments");
const { StatusCodes } = require("http-status-codes");

const Create = async (req, res, next) => {
  try {
    const result = await createPayments(req);

    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const Update = async (req, res, next) => {
  try {
    const result = await updatePayments(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const Index = async (req, res, next) => {
  try {
    const result = await getAllPayments(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const Find = async (req, res, next) => {
  try {
    const result = await getOnePayments(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const Destroy = async (req, res, next) => {
  try {
    const result = await deletePayments(req);

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
};
