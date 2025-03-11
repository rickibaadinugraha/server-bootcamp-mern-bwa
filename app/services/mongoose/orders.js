// const { query } = require("express");
const Orders = require("../../api/v1/orders/model");

const getAllOrders = async (req) => {
  const { limit = 10, page = 1, startDate, EndDate } = req.query;
  let condition = {};

  // let match = {};

  if (req.user.role !== "owner") {
    condition = { ...condition, "historyEvent.organizer": req.user.organizer };
  }

  if (startDate && EndDate) {
    const start = new Date(startDate);
    start.setHours(0, 0, 0);
    const end = new Date(EndDate);
    end.setHours(23, 59, 59);
    condition = {
      ...condition,
      date: {
        $gte: start,
        $lt: end,
      },
    };
  }

  console.log("organizer", req.user.organizer);

  const result = await Orders.find(condition)
    .populate({ path: "event" })
    .limit(limit)
    .skip(limit * (page - 1));

  const count = await Orders.countDocuments(condition);

  return { data: result, pages: Math.ceil(count / limit), total: count };
};

module.exports = getAllOrders;
