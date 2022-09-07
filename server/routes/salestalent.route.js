import express from "express";
import {
  createSalestalent,
  loginSalestalent,
  
} from "../controller/index.js";

const SalestalentRouter = express.Router();

SalestalentRouter.post("/salestalent/signup", createSalestalent);

SalestalentRouter.post("/salestalent/login", loginSalestalent);



export { SalestalentRouter };
