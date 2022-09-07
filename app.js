import express from 'express';
import path from 'path';
import httperrors from 'http-errors';

const app =express()
import {connectDB} from "./server/db/conn.js";
import {router} from "./server/routes/record.js";
import { SalestalentRouter } from './server/routes/salestalent.route.js';
const createError = httperrors();
import dotenv from 'dotenv';
dotenv.config();

//connect to DB
connectDB();
app.use("/",router);  
app.use("/api", SalestalentRouter);

const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log("Server up and running available at http://localhost:" + port)
);

app.use(function (req, res, next) {
  next(createError(404));
});


