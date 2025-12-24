import { Router } from "express";
import sendMail from "../controllers/contactController.js";

const contactRouter = Router();

contactRouter.post("/email", sendMail);

export default contactRouter;
