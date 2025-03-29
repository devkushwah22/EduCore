// Step1: Import the required modules
const express = require("express")
const router = express.Router()



// Step2: Import the required controllers and middleware functions
// Authentication & Authorization Controllers
const {
  login,
  signup,
  sendotp,
  changePassword,
} = require("../controllers/Auth")  
 
// Reset Password Controllers
const {
  resetPasswordToken,
  resetPassword,
} = require("../controllers/ResetPassword")

// Middleware for authenticating the user
// This middleware will be used to authenticate the user before accessing the routes
// This middleware will check if the user is logged in or not
// If the user is not logged in, it will return a 401 Unauthorized status code
// If the user is logged in, it will allow the user to access the routes
// This middleware will be used in the routes where we want to authenticate the user
const { auth } = require("../middlewares/auth")



// Step3: Define the routes



// Routes for Login, Signup, and Authentication

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

// Route for user login
router.post("/login", login)

// Route for user signup
router.post("/signup", signup)

// Route for sending OTP to the user's email
router.post("/sendotp", sendotp)

// Route for Changing the password
router.post("/changepassword", auth, changePassword)

// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************

// Route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken)

// Route for resetting user's password after verification
router.post("/reset-password", resetPassword)

// Step4: Export the router for use in the main application
module.exports = router