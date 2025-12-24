import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import adminRouter from "./routes/adminRoute.js";
import projectRouter from "./routes/projectRoute.js";
import contactRouter from "./routes/contactRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.get("/test",(req ,res)=>{
  res.send("woking")
})

app.use(cors());

app.use(express.json());

app.use("/admin", adminRouter);

app.use("/project", projectRouter);

app.use("/send", contactRouter);

app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ message: err.message });
});

connectDB();

app.listen(port, () => {
  console.log("Server running on ", port);
});
