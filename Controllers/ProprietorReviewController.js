const proprietorReview = require("../Models/propreitorReviewModel");
const catchAsync = require("../Utilities/catchAsync");
const appError = require("../Utilities/appError");

exports.createReview = catchAsync(async (req, res, next) => {
  const { proprietorId } = req.body;

  if (!proprietorId)
    return next(new appError("Proprietor's id is missing.", 400));

  const review_object = {
    proprietorName: req.user.ProprietorName,
    pincode: req.user.pincode,
    ...req.body,
  };

  const doc = await proprietorReview.create(review_object);

  res.status(200).json({
    status: "Success",
    data: {
      message: "Review sent successfully.",
      data: doc,
    },
  });
});
