const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const db = process.env.DATABASE.replace(
  "<db_password>",
  process.env.DATABASE_PW
);

mongoose
  .connect(db)
  .then((con) => console.log("Database connected successfully"))
  .catch((err) => console.log("error occured ->", err));

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`Server started successfully on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNCAUGHT PROMISE REJECTION->", err);
  server.close(() => {
    process.exit(1);
  });
});
