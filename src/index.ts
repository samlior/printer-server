import express from "express";

const app = express();

const port = 3000;

app.get("/", (req, res) => {
  console.log("req:", req.headers, req.params);

  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
