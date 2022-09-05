import express from 'express';
import path from 'path';
import httperrors from 'http-errors';

const app =express()
import {connectDB} from "./server/db/conn.js";
import {router} from "./server/routes/record.js";
const createError = httperrors();


//connect to DB
connectDB();
app.use("/",router);


const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log("Server up and running available at http://localhost:" + port)
);

app.use(function (req, res, next) {
  next(createError(404));
});


