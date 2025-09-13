const express = require("express");
const Url = require("../models/url");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.post("/shorten", async (req, res) => {
  const url = req.body.url;
  const { nanoid } = await import("nanoid");
  const shortCode = nanoid(8);

  const data = await Url.create({
    longUrl: url,
    shortCode: shortCode,
  });

  res.render("results", { shortUrl: data.shortCode });
});

router.get("/manage", async (req, res) => {
  try {
    const urls = await Url.find().sort({ createdAt: -1 });
    res.render("manage", { urls, req });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

router
  .route("/:shortCode")
  .get(async (req, res) => {
    const data = await Url.findOne({ shortCode: req.params.shortCode });

    if (data) {
      data.clicks += 1;
      await data.save();
      res.redirect(data.longUrl);
    } else {
      return res.status(400).send("URL not found");
    }
  });

router.post("/delete/:id", async (req, res) => {
  try {
    await Url.findByIdAndDelete(req.params.id);
    res.redirect("/manage");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
})

module.exports = router;
