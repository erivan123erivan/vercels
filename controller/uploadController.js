const cloudinary = require("../utils/cloudinary");

exports.uploadImage = async(req, res) => {
    try {
        const image = await cloudinary.uploader.upload(req.file.path);
        if(image){
            res.send({ success: true, image, message: "Uploaded" });
        }
        
      } catch (error) {
        res.send(error);
      }
};
