import express from "express";

const fileUploader = (
  req: express.Request | any,
  res: express.Response | any,
  next: express.NextFunction
) => {
  const random = crypto.randomUUID();

  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      req.images = [];
      next();
    }

    const image = req.files.image;
    const imagePath = __dirname + "/uploads/" + `${random}-` + image.name;

    image.mv(imagePath, function (err: any) {
      if (err) return res.status(500).send(err);

      req.images = [imagePath];
      next();
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error while uploading images.", error: error });
  }
};

export default fileUploader;
