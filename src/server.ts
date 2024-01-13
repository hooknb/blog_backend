import express from "express";

const app = express();
const port = 1709;

app.get("*", (req, res, next) => {
  console.log("Request hit by men.");
  res.send("Request.");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});
