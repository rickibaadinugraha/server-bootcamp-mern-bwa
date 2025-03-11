// import
const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("./custom-api-error");

class BadRequest extends CustomAPIError {
  constructor(message) {
    super(message);

    // get statuscode bad request
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequest;
