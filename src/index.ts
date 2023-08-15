import express from "express";

const app = express();

const port = 3000;

app.get("/", (req, res) => {
  console.log(
    "get req:",
    req.headers,
    req.params,
    req.body,
    req.baseUrl,
    req.originalUrl
  );

  res.send("Hello World!");
});

app.post("/", (req, res) => {
  console.log(
    "post req:",
    req.headers,
    req.params,
    req.body,
    req.baseUrl,
    req.originalUrl
  );

  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
