'use strict';

require('dotenv').config();

const express = require('express');
const app = module.exports = express();
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect(process.env.MONGODB_URI);

app.use(require(`./routes.js`));

let http = null;
let isRunning = null;

module.exports = {
   start: () => {
       if (isRunning) return "Server is already running";
       if (process.env.BACKEND_PORT === undefined) return console.log("You need to create a .env file like the guide says.");
       http = app.listen(process.env.BACKEND_PORT, () => {
           console.log(`Server is running on port ${process.env.BACKEND_PORT}`);
           isRunning = true;
       });
   },
   stop: () => {
       if (!isRunning) return "Server is already shut down";
       if (!http) return "Invalid Server";
       http.close(() => {
           http = null;
           isRunning = false;
           console.log('Server shut down.');
       });
   }
}
