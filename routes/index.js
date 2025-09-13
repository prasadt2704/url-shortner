const express = require("express");
const Url = require("../models/url");
const {
  renderIndexPage,
  renderManagePage,
  handleShortenUrl,
  handleShortUrlRedirect,
  handleDeleteShortUrl,
} = require("../controllers/index");

const router = express.Router();

router.get("/", renderIndexPage);

router.post("/shorten", handleShortenUrl);

router.get("/manage", renderManagePage);

router.route("/:shortCode").get(handleShortUrlRedirect);

router.post("/delete/:id", handleDeleteShortUrl);

module.exports = router;
