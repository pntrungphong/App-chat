import {uploadFileMiddleware} from "../middleware/upload";
export const upload = async (req:any, res:any,next:any) => {
    try {
      await uploadFileMiddleware(req, res);
  
      if (req.file == undefined) {
        return res.status(400).send({ message: "Please upload a file!" });
      }
  
      res.status(200).send({
        message: "Uploaded the file successfully: " + req.file.originalname,
      });
    } catch (err) {
        next(err);
      res.status(500).send({
        message: `Could not upload the file: ${req.file.originalname}. ${err}`,
      });
    }
  };