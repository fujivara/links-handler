const catchAsync = require('../utils/catchAsync');
const ShortUrl = require('../models/shortUrl');

exports.createUrl = catchAsync(async (req, res, next) => {
  const newLink = await ShortUrl.create({ full: req.body.full });

  res.status(200).json({
    status: 'success',
    url: newLink,
  });
});

exports.getShortUrl = catchAsync(async (req, res, next) => {
  const url = await ShortUrl.findOne({ short: req.params.shortUrl });

  url.clicks++;
  url.save();

  res.redirect(url.full);
});

exports.createUserUrl = catchAsync(async (req, res, next) => {
  const url = await ShortUrl.findOneAndUpdate(
    { short: req.body.shortUrl },
    { creator: req.body.id, description: req.body.description }
  );

  res.status(200).json({
    status: 'success',
    url,
    message: `Url added to the user ${req.body.id}`,
  });
});

exports.getAllUserLinks = catchAsync(async (req, res, next) => {
  const urls = await ShortUrl.find({ creator: req.body.id });

  res.status(200).json({
    status: 'success',
    urls,
  });
});
