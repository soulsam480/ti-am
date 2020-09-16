const express = require("express");
const connectDB = require("./config/db");
const shortid = require("shortid");
const validUrl = require("valid-url");
const shortUrlRoute = require("./routes/shorten");
const getShortenUrlRoute = require("./routes/shorted");

const app = express();
connectDB();

app.use(express.json({}));
const PORT = 8000;
app.listen(PORT, () => console.log("Server is listening on port " + PORT));

app.use("/v1/", getShortenUrlRoute);
app.use("/v1/shorturl", shortUrlRoute);
