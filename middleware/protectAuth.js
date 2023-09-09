const AppError = require('../utils/appError');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

exports.protectAuth = catchAsync(async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return next(new AppError('Token is missing', 401));
  }

  const token = authorization.split(' ')[1];

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    req.body.id = id;

    next();
  } catch (err) {
    return next(new AppError('Not authorized', 401));
  }
});
