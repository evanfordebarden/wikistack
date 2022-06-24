const express = require("express");
const morgan = require("morgan");
const urlencoded = express.urlencoded();
const expressStatic = express.static("./public");
const mainView = require("./views/main");
const { db, Page, User } = require("./models");

const app = express();
app.use(urlencoded);
app.use(morgan("dev"));
app.use(expressStatic);

db.authenticate().then(() => {
  console.log("connected to the database");
});

app.get("/", (req, res) => {
  res.send(mainView());
});

const PORT = 3000;

const init = async () => {
  await db.sync({ force: true }); // { force: true }
  // make sure that you have a PORT constant
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}!`);
  });
};

init();

// app.listen(PORT, () => {
//   console.log(`App listening in port ${PORT}`);
// });
