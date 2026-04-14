const proprietor = require("../Models/proprietorModel");
const catchAsync = require("../Utilities/catchAsync");
const appError = require("../Utilities/appError");

const filterObj = (obj, ...allowedFields) => {
  let newObject = {};
  Object.keys(obj).forEach((curr_el) => {
    if (allowedFields.includes(curr_el))
      return (newObject[curr_el] = obj[curr_el]);
  });
  return newObject;
};

exports.updateShopInfo = catchAsync(async (req, res, next) => {
  if (req.body.password)
    return next(new appError("invalid fields are included", 400));

  const filteredObject = filterObj(
    req.body,
    "ProprietorName",
    "shopName",
    "shopAddress",
    "shopCategory",
    "contactNumber",
    "proprietorGST"
  );

  const doc = await proprietor.findByIdAndUpdate(req.user.id, filteredObject, {
    runValidators: true,
    new: true,
  });

  if (!doc) {
    return next(new appError("Failed to update details", 400));
  }

  res.status(200).json({
    status: "Success",
    data: doc,
  });
});
