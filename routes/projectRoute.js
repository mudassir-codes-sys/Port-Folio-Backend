import { Router } from "express";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";
import { addProject, getProjects } from "../controllers/projectController.js";

const projectRouter = Router();

projectRouter.post(
  "/add",
  adminAuth,
  upload.fields([
    { name: "images", max: 5 },
    { name: "video", max: 1 },
  ]),
  addProject
);
projectRouter.get("/get", getProjects);

export default projectRouter;
