// import
const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("./custom-api-error");

class NotFound extends CustomAPIError {
  constructor(message) {
    super(message);

    // get status code
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

module.exports = NotFound;
