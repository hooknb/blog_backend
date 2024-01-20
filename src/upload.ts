// app.post('/upload', function(req, res) {
//     let sampleFile;
//     let uploadPath;

//     if (!req.files || Object.keys(req.files).length === 0) {
//       return res.status(400).send('No files were uploaded.');
//     }

//     // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
//     sampleFile = req.files.sampleFile;
//     uploadPath = __dirname + '/somewhere/on/your/server/' + sampleFile.name;

//     // Use the mv() method to place the file somewhere on your server
//     sampleFile.mv(uploadPath, function(err) {
//       if (err)
//         return res.status(500).send(err);

//       res.send('File uploaded!');
//     });
//   });

const fileUploader = (req, res, next) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    }

    const image = req.files.image;
    const imagePath = __dirname + "/uploads/" + image.name;

    image.mv(imagePath, function (err: any) {
      if (err) return res.status(500).send(err);

      res.images = [imagePath];
      res.send("File uploaded!");
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to upload file", error: error });
  }
};

export default fileUploader;
