const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const mkdir = require("mkdir");
const fs = require("fs-extra");
const cors = require("cors");
//intialize app
const app = express();
app.use(cors());
app.use(express.static(path.resolve(__dirname, "../client/build")));
// dotenv.config({ path: "./.env" });
const PORT = process.env.PORT || 3000;

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

require("./config/db");
require("./router.js")(app);

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
