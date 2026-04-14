const express = require("express");
const NotesController = require("../Controllers/NotesController");
const userAuthController = require("../Controllers/UserAuthController");
const ScoreCountController = require("../Controllers/ScoreCountController");
const customerRouter = express.Router();

customerRouter
  .route("/signup-user")
  .post(userAuthController.customerAuthentication);

customerRouter
  .route("/verification-user")
  .post(userAuthController.customerVerification_N_Authentication);

customerRouter.use(userAuthController.customerProtectMiddleware);

customerRouter
  .route("/customer-logout")
  .post(userAuthController.logout_Customer);

customerRouter
  .route("/update-customer-info")
  .patch(userAuthController.updateUserInfo);

customerRouter
  .route("/get-my-crdit-score")
  .get(ScoreCountController.totalMycrditScore);

//CUSTOMER NOTE ROUTES..

//1. Check requests.
customerRouter
  .route("/note-approval-request")
  .patch(NotesController.acceptingNoteMiddleware);

//2. Running debts.
customerRouter
  .route("/all-pending-notes")
  .post(NotesController.getAllPendingNotes);

//3. Check history.
customerRouter
  .route("/all-cleared-notes")
  .get(NotesController.getAllClearedNotes);

//4. Credit score
customerRouter
  .route("/get-my-crdit-score")
  .post(ScoreCountController.totalMycrditScore);

module.exports = customerRouter;
