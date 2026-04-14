const express = require("express");
const path = require("path");
const xss = require("xss");
const cors = require("cors");
const mongosanitize = require("express-mongo-sanitize");
const cookieParser = require("cookie-parser");
const rateLimiter = require("express-rate-limit");
const customerRouter = require("./Routers/CustomerRouter");
const proprietorRouter = require("./Routers/ProprietorRouter");
const DebtNoteRouter = require("./Routers/DebtNoteRouter");
const appError = require("./Utilities/appError");
const errorController = require("./Controllers/ErrorController");

const app = express();

// Global middleware (CORS) (Cross Origin Resource Sharing)
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    exposedHeaders: ["SET-COOKIE"],
    methods: ["PATCH", "GET", "PUT", "POST", "HEAD", "DELETE"],
  })
);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.use(cookieParser());
app.use(mongosanitize());
// app.use(xss());

const limiter = rateLimiter({
  max: 100,
  windowMs: 60 * 1000,
  message:
    "Request limits reached from this IP Address, try again after a minute.",
});

app.use("/mycrdit/api", limiter);

//Routes
app.use("/mycrdit/api/customer", customerRouter);
app.use("/mycrdit/api/proprietor", proprietorRouter);
// app.use("/mycrdit/api/debt-notes", DebtNoteRouter); // not in use

app.use("*", (req, res, next) => {
  const err = new appError(`Invalid route ${req.originalUrl} requested`, 404);
  next(err);
});

app.use(errorController);
module.exports = app;
