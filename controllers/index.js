const Url = require("../models/url");

async function renderIndexPage(req, res) {
  return res.render("index");
}

async function handleShortenUrl(req, res) {
  const url = req.body.url;
  const { nanoid } = await import("nanoid");
  const shortCode = nanoid(8);

  const data = await Url.create({
    longUrl: url,
    shortCode: shortCode,
  });

  return res.render("results", { shortUrl: data.shortCode });
}

async function renderManagePage(req, res) {
  try {
    const urls = await Url.find().sort({ createdAt: -1 });
    return res.render("manage", { urls, req });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error");
  }
}

async function handleShortUrlRedirect(req, res) {
  const data = await Url.findOne({ shortCode: req.params.shortCode });

  if (data) {
    data.clicks += 1;
    await data.save();
    return res.redirect(data.longUrl);
  } else {
    return res.status(400).send("URL not found");
  }
}

async function handleDeleteShortUrl(req, res) {
  try {
    await Url.findByIdAndDelete(req.params.id);
    return res.redirect("/manage");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error");
  }
}


module.exports = {
  renderIndexPage,
  renderManagePage,
  handleShortenUrl,
  handleShortUrlRedirect,
  handleDeleteShortUrl
}