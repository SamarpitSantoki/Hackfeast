const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const mkdir = require('mkdir')
const fs = require('fs-extra')
//intialize app
const app = express();

dotenv.config({ path: "./.env" });
const PORT = parseInt(process.env.PORT) || 3000;

app.use(bodyParser.urlencoded({
    extended: true,
}))

require('./config/db')
require("./router.js")(app);

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));