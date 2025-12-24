import cloudinary from "../config/cloudinary.js";
const cloudinaryHelper = (
  buffer,
  folder,
  filename,
  resource_type = "image"
) => {
  return new Promise((res, rej) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type,
        public_id: filename,
      },
      (err, result) => (err ? rej(err) : res(result.secure_url))
    );
    stream.end(buffer);
  });
};

export default cloudinaryHelper;
