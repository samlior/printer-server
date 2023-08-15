import express from "express";
import axios from "axios";

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

  const params: any = req.baseUrl;

  setTimeout(() => {
    console.log("reach timeout");
    axios
      .post(
        params.response_url,
        {
          response_type: "in_channel",
          blocks: [
            {
              type: "header",
              text: {
                type: "text",
                text: "This is a delay response",
              },
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log("response:", response.headers, response.data);
      })
      .catch((err) => {
        console.log("axios error:", err);
      });
  }, 3000);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
