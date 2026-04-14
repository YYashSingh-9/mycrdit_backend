const debtNote = require("../Models/noteModel");
const paidNote = require("../Models/paidNoteModel");
const proprietor = require("../Models/proprietorModel");
const catchAsync = require("../Utilities/catchAsync");
const appError = require("../Utilities/appError");

//Proprietor
exports.allRunningNotes_proprietor = catchAsync(async (req, res, next) => {
  const { _id: propId } = req.user;

  if (!propId) return next(new appError("Proprietor Id missing", 400));

  const doc = await debtNote.find({ proprietorId: { $in: propId } });

  res.status(200).json({
    status: "Success",
    data: doc,
  });
});

exports.allClearedNotes = catchAsync(async (req, res, next) => {
  const { _id } = req.user;

  if (!_id)
    return next(
      new appError("Proprietor Id missing from client side, retry.", 400)
    );

  const doc = await debtNote.find({
    proprietorId: { $in: _id },
    cleared: { $in: true },
  });

  res.status(200).json({
    status: "Success",
    data: doc,
  });
});

// THIS IS MAIN CREATE NOTE
exports.createNote = catchAsync(async (req, res, next) => {
  if (!req.body)
    return next(
      new appError("Content required to create note is missing, retry.", 400)
    );

  const doc = await debtNote.create(req.body);

  res.status(200).json({
    status: "Success",
    data: doc,
  });
});

exports.notePaidController = catchAsync(async (req, res, next) => {
  const { debtNote_Id } = req.body;

  if (!debtNote_Id)
    return next(new appError("Some credentials are missing, retry.", 400));

  //1. changing cleared status.
  const doc__ = await debtNote.findOneAndUpdate(
    { _id: debtNote_Id },
    { cleared: true },
    {
      runValidators: true,
      new: true,
    }
  );

  //2. adding this to paidNoteModel.
  const doc2 = await paidNote.create(req.body);

  res.status(200).json({
    status: "Success",
    data: doc2,
  });
});

// This is not required rn.
// exports.paidNotePre_Controller = catchAsync(async (req, res, next) => {
//   const { paymentDate, debtNote_Id, customerNumber } = req.body;
//   let seconds, minutes, hours, days;
//   //1.
//   const doc = await debtNote.findById(debtNote_Id);

//   //2.
//   const date_Old = new Date(doc.date); // Date of note creation
//   const date_New = new Date(paymentDate); // Date of payment

//   //3.
//   const totalMilliseconds = date_New - date_Old;
//   seconds = parseInt(Math.round(totalMilliseconds / 1000));
//   minutes = parseInt(Math.round(seconds / 60));
//   hours = parseInt(Math.round(minutes / 60));
//   days = parseInt(Math.round(hours / 24));

//   const lengthOfPayment = days;
//   const thirtyDayPayment = lengthOfPayment <= 30 ? true : false;

//   const dummyObj = {
//     debtNote_Id: debtNote_Id,
//     customerNumber: customerNumber,
//     paymentDate: paymentDate,
//     thirtyDayPayment: thirtyDayPayment,
//     lengthOfDebt: lengthOfPayment,
//   };

//   req.body = dummyObj;
//   next();
// });

exports.createNoteMiddleware = catchAsync(async (req, res, next) => {
  const doc = req.body;

  if (!doc) return next(new appError("Content from client side missing", 400));

  const dummyDoc1 = { ...doc };

  const proprietorDetail = await proprietor.findById(dummyDoc1.proprietorId);

  // Current date.
  const today = new Date().toISOString();
  const date = today.slice(0, 10);

  // Client must accept this note first, after that acceptanceStatus : true
  const dummydoc2 = {
    ...dummyDoc1,
    proprietor_name: proprietorDetail.ProprietorName,
    productBrand: "Default Brand",
    productName: "Default brand name",
    customerName: "Customer_",
    cleared: false,
    acceptanceStatus: false,
    deleted: false,
    rated: false,
    date: date,
  };
  console.log(dummydoc2);
  req.body = dummydoc2;
  next();
});

exports.deleteNote = catchAsync(async (req, res, next) => {
  const { noteId } = req.body;

  if (!noteId) {
    return next(
      new appError("Error occured while deleting, something missing", 404)
    );
  }

  const data = await debtNote.findOneAndUpdate(
    { _id: noteId },
    { deleted: true },
    { runValidators: true, new: true }
  );

  res.status(200).json({
    status: "Success",
    data: data,
  });
});

//2. CUSTOMER
exports.acceptingNoteMiddleware = catchAsync(async (req, res, next) => {
  const { noteId } = req.body;

  if (!noteId)
    return next(new appError("Some error occured please try again", 400));

  const doc = await debtNote.findOneAndUpdate(
    { _id: noteId },
    { acceptanceStatus: true },
    {
      runValidators: true,
      new: true,
    }
  );

  res.status(200).json({
    status: "Success",
    data: doc,
  });
});

exports.getAllPendingNotes = catchAsync(async (req, res, next) => {
  const { customerNumber, requestFor } = req.body;

  if (!customerNumber)
    return next(
      new Error(
        "Some error occured while checking data from user side, check and retry."
      )
    );

  //1. All accepted but not paid notes.
  const doc = await debtNote.find({
    customerNumber: { $in: customerNumber },
    cleared: { $in: false },
    deleted: { $in: false },
    acceptanceStatus: { $in: true },
  });

  //2. All not accepted and not paid notes.
  const doc2 = await debtNote.find({
    customerNumber: { $in: customerNumber },
    acceptanceStatus: { $in: false },
    deleted: { $in: false },
  });

  const finalDoc = requestFor === "accepted-notes" ? doc : doc2;

  res.status(200).json({
    status: "Success",
    data: finalDoc,
  });
});

//History..
exports.getAllClearedNotes = catchAsync(async (req, res, next) => {
  const { contactNumber } = req.user;

  if (!contactNumber)
    return next(
      new appError("Contact number missing from client side, retry.", 400)
    );

  const doc = await debtNote.find({
    customerNumber: { $in: contactNumber },
    cleared: { $in: true },
  });

  res.status(200).json({
    status: "Success",
    data: doc,
  });
});

// Get All notes of a specific customer
exports.getAllSpecific_CustomerNotes = catchAsync(async (req, res, next) => {
  const { customerNumber } = req.body;

  if (!customerNumber)
    return next(new appError("Customer number missing", 404));

  const data = await debtNote.find({
    customerNumber: { $in: customerNumber },
  });

  res.status(200).json({
    status: "Success",
    data: data,
  });
});
