// THIS IS NOT OF USE RIGHT NOW.
// customer note requests were collectively inserted in customer router, so this router is
// not of use. This will be deleted in future updates.

// const express = require("express");
// const NoteRouter = express.Router();
// const NotesController = require("../Controllers/NotesController");
// const UserAuthController = require("../Controllers/UserAuthController");
// const ScoreCountController = require("../Controllers/ScoreCountController");

// // Transactional credit score count here..
// // NoteRouter.route("/note-payment").post(
// //   UserAuthController.protect,
// //   ScoreCountController.transactionalCreditScore_Count,
// //   NotesController.notePaidController
// // );

// //CUSTOMER NOTE ROUTES..

// //1. Check requests.
// NoteRouter.route("/note-approval-request").patch(
//   UserAuthController.customerProtectMiddleware,
//   NotesController.acceptingNoteMiddleware
// );

// //2. Running debts.
// NoteRouter.route("/all-pending-notes").get(
//   UserAuthController.customerProtectMiddleware,
//   NotesController.getAllPendingNotes
// );

// //3. Check history.
// NoteRouter.route("/all-cleared-notes").get(
//   UserAuthController.customerProtectMiddleware,
//   NotesController.getAllClearedNotes
// );

// NoteRouter.route("/get-my-crdit-score").get(
//   UserAuthController.customerProtectMiddleware,
//   ScoreCountController.totalMycrditScore
// );
// module.exports = NoteRouter;
