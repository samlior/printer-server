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

app.post("/", express.urlencoded({ extended: false }), (req, res) => {
  console.log(
    "post req:",
    req.headers,
    req.params,
    req.body,
    req.baseUrl,
    req.originalUrl
  );

  res.type("application/json");
  res.send(
    JSON.stringify({
      response_type: "in_channel",
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "*It's 80 degrees right now.*",
          },
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "Partly cloudy today and tomorrow",
          },
        },
      ],
    })
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
