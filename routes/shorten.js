const express = require("express");
const { isValid } = require("shortid");
const shortid = require("shortid");
const validUrl = require("valid-url");
const config = require("../config/default.json");
const Url = require("../models/url");

var shortUrlRoute = express.Router();

shortUrlRoute.post("/", async (req, res) => {
  const longUrl = req.body.longUrl;
  const baseUrl = config.baseURL;
  console.log(`${longUrl} and ${baseUrl}`);

  //todo initialize
  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json("Internal; Server Error");
  }
  const urlCode = shortid.generate();

  if (validUrl.isUri(longUrl)) {
    try {
      var url = await Url.findOne({ longUrl: longUrl });
      console.log(url);
      if (url) {
        return res.status(200).json(url);
      } else {
        const shortUrl = baseUrl + "/" + urlCode;
        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          clickCount: 0,
        });

        await url.save();
        return res.status(201).json(url);
      }
    } catch (err) {
      console.error(err.message);
      return res.status(500).json("Internal Server error " + err.message);
    }
  } else {
    res
      .status(400)
      .json("Invalid URL. Please enter a vlaid url for shortening.");
  }
});

module.exports = shortUrlRoute;
