import cloudinary from "../config/cloudinary.js";
import cloudinaryHelper from "../config/cloudinaryHelper.js";
import projectModel from "../models/projectModel.js";
import ProjectModel from "../models/projectModel.js";

const addProject = async (req, res) => {
  try {
    console.log("APi hit main");

    const { title, description, liveUrl, status, category } = req.body;
    const tech =
      req.body.tech instanceof Array ? req.body.tech : [req.body.tech];
    const images = req.files.images
      ? await Promise.all(
          req.files.images.map((file, i) =>
            cloudinaryHelper(
              file.buffer,
              "Projects",
              `${title}_img${i + 1}`,
              "image"
            )
          )
        )
      : [];
    const video =
      req.files.video && req.files.video[0]
        ? await cloudinaryHelper(
            req.files.video[0].buffer,
            "Projects",
            `${title}_video`,
            "video"
          )
        : "";

    const project = await new ProjectModel({
      title,
      description,
      liveUrl,
      tech,
      status,
      category,
      images,
      video,
    });

    await project.save();

    res.status(200).json({ success: true, message: "Project Uploaded" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getProjects = async (req, res) => {
  try {
    const project = await projectModel.find({});
    const projects = project.reverse();
    res.status(200).json({ success: true, projects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export { getProjects, addProject };
