// import
const Users = require("../../api/v1/users/model");
const Organizers = require("../../api/v1/organizers/model");
const { BadRequestError } = require("../../errors");
const { StatusCodes } = require("http-status-codes");

const createOrganizer = async (req) => {
  const { name, organizer, email, role, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    throw new BadRequestError("Password and confirm password not match");
  }

  const result = await Organizers.create({ organizer });
  const users = await Users.create({
    name,
    organizer: result._id,
    email,
    password,
    role,
  });

  delete users._doc.password;

  return users;
};

const createUsers = async (req, res) => {
  const { name, role, password, confirmPassword, email } = req.body;

  if (password !== confirmPassword) {
    throw new BadRequestError("Password and confirm password not match");
  }

  const result = await Users.create({
    name,
    email,
    organizer: req.user.organizer,
    password,
    role,
  });

  return result;
};

const getAllUsers = async (req) => {
  const result = await Users.find();

  return result;
};

module.exports = { createOrganizer, createUsers, getAllUsers };
