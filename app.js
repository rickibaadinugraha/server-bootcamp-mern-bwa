// import
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const app = express();
const cors = require("cors");

// router
const categoriesRouter = require("./app/api/v1/categories/router");
const imagesRouter = require("./app/api/v1/images/router");
const talentsRouter = require("./app/api/v1/talents/router");
const eventsRouter = require("./app/api/v1/events/router");
const organizersRouter = require("./app/api/v1/organizers/router");
const authCMSRouter = require("./app/api/v1/auth/router");
const ordersRouter = require("./app/api/v1/orders/router");
const participantsRouter = require("./app/api/v1/participants/router");
const paymentsRouter = require("./app/api/v1/payments/router");
const v1cms = "/api/v1/cms";
const v1 = "/api/v1/";

// custom error
const notFoundMiddleware = require("./app/middlewares/not-found");
const handleErrorMiddleware = require("./app/middlewares/handle-error");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to API Website event",
  });
});

app.use(v1cms, categoriesRouter);
app.use(v1cms, imagesRouter);
app.use(v1cms, talentsRouter);
app.use(v1cms, eventsRouter);
app.use(v1cms, organizersRouter);
app.use(v1cms, authCMSRouter);
app.use(v1cms, ordersRouter);
app.use(v1cms, paymentsRouter);
app.use(v1, participantsRouter);

app.use(notFoundMiddleware);
app.use(handleErrorMiddleware);

module.exports = app;
