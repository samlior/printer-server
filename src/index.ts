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
  console.log("post req:", req.headers, req.body);

  const params: any = req.body;

  res.type("application/json");

  if ((params.text as string).includes("generate")) {
    res.send(
      JSON.stringify({
        response_type: "in_channel",
        text: "Generating snapshot(9486336,5,2), please wait...",
      })
    );

    setTimeout(() => {
      axios
        .post(
          params.response_url,
          {
            response_type: "in_channel",
            text: "Your snapshot(9486336,5,2) has been generated, snapshot id: 15",
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
  } else {
    res.send(
      JSON.stringify({
        response_type: "in_channel",
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "> query 15 gate.balanceOf 0x320b9E352b1D5DE458F5A8001633b08af302892A",
            },
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "11223344",
            },
          },
        ],
      })
    );
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
