const express = require("express");
const router = express.Router();
const Axios = require("axios");
require("dotenv").config();
const gptKey = process.env.GPTKEY;

router.route("/").post(async (req, res) => {
  const { image, noimages, resolution = "1024x1024" } = req.body;
  try {
    const r = await Axios.post(
      "https://api.openai.com/v1/images/generations",
      {
        headers: {
          ContentType: "application/json",
          Authorization: `Bearer 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`,
        },
      },
      {
        data: {
          model: "dall-e-3",
          prompt: image,
          n: noimages,
          size: resolution,
        },
      }
    )
      .then((r) => {
        res.json(r.data.data);
      })
      .catch((e) => {
        res.json(e.response.data).status(e.response.status);
      });
  } catch (err) {
    console.error(err);
  } finally {
    console.log("Execution Complete!");
  }
});

module.exports = router;
