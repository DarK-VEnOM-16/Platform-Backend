
const express = require('express');

import connectDB from "db/conn";


//import Routes
import {recordRoutes} from './routes/record.js'

//connect to DB
connectDB();

//middleware

//Route middleware
app.use("/api", recordRoutes);


//app.use('/api/posts',postRoute);

const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log("Server up and running available at http://localhost:" + port)
);

app.use(function (req, res, next) {
  next(createError(404));
});


