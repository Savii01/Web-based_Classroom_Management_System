const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');

const User = require('../models/userData');

const router = express.Router();

// Register route
router.post(
  '/signup',
    [
      // validation middleware
    body('userName').not().isEmpty().withMessage('Username is required'),
    body('email')
      .not().isEmpty().withMessage('Email is required')
      .matches(/^[a-zA-Z0-9_.+-]+@(gmail|yahoo|apple)\.[a-zA-Z0-9-.]+$/)
      .withMessage('Invalid email format or domain'),
    body('userPassword')
      .not().isEmpty().withMessage('Password is required')
      .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('phone')
      .not().isEmpty().withMessage('Phone number is required')
      .matches(/^\+[1-9]\d{1,14}$/).withMessage('Invalid phone number format'),
    body('position').not().isEmpty().withMessage('Position is required'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { userName, email, userPassword, phone, position } = req.body;

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(409).json({ message: 'Email is already registered' });
      }

      const otp = generateOTP(); // Generate OTP
      await sendOTPEmail(email, otp); // Send OTP email to the user's email

      const hashedPassword = await bcrypt.hash(userPassword, 10);

      const newUser = await User.create({
        userName,
        email,
        userPassword: hashedPassword,
        phone,
        position,
        otp, // Store OTP in the user record
      });

      // Redirect to OTP verification route after successful signup
      res.redirect('/verify-otp');
    } catch (error) {
      console.error('Error during user registration:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
);

// Login route
router.post(
  '/signin',
    [
      // validation middleware
    body('userName').not().isEmpty().withMessage('Username is required'),
    body('email')
      .not().isEmpty().withMessage('Email is required')
      .matches(/^[a-zA-Z0-9_.+-]+@(gmail|yahoo|apple)\.[a-zA-Z0-9-.]+$/)
      .withMessage('Invalid email format or domain'),
    body('userPassword')
      .not().isEmpty().withMessage('Password is required')
      .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('phone')
      .not().isEmpty().withMessage('Phone number is required')
      .matches(/^\+[1-9]\d{1,14}$/).withMessage('Invalid phone number format'),
    body('position').not().isEmpty().withMessage('Position is required'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, userPassword } = req.body;

      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email' });
      }

      const isPasswordValid = await bcrypt.compare(userPassword, user.userPassword);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password' });
      }

      const otp = generateOTP(); // Generate OTP
      await sendOTPEmail(email, otp); // Send OTP email to the user's email

      const token = jwt.sign({ userId: user.userID }, 'Savii123', {expiresIn:"5d"});
       const { password, ...info } = user._doc;

      res.status(200).json({ token, ...info});

      // Redirect to OTP verification route after successful sign-in
      res.redirect('/verify-otp');
    } catch (error) {
      console.error('Error during user login:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
);

// OTP verification route


// OTP verification form submission route
router.post('/verify-otp', 
  [
    body('email')
      .not().isEmpty().withMessage('Email is required')
      .matches(/^[a-zA-Z0-9_.+-]+@(gmail|yahoo|apple)\.[a-zA-Z0-9-.]+$/)
      .withMessage('Invalid email format or domain'),
    body('otp').not().isEmpty().withMessage('OTP is required'),
  ],


async (req, res) => {
  
  try {
    const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

    const { email, otp } = req.body;

    // ... OTP verification logic ...
    const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email' });
      }

      if (user.otp !== otp) {
        return res.status(401).json({ message: 'Invalid OTP' });
      }

      // Generate new OTP and update it in the user record
      const newOTP = generateOTP();
      await User.update({ otp: newOTP }, { where: { email } });

      // Send new OTP email to the user's email
      await sendOTPEmail(email, newOTP);
       res.status(200).json({ message: 'OTP verified successfully' });

    // Redirect to the respective user's dashboard based on their role
   if (user.isAdmin === 'true') {
      res.status(200).json({ message: 'Admin dashboard' });
    } else if (user.position === 'teacher') {
      res.status(200).json({ message: 'Teacher dashboard' });
    } else if (user.position === 'student') {
      res.status(200).json({ message: 'Student dashboard' });
    } else {
      res.status(401).json({ message: 'Invalid user role' });
    }
  } catch (error) {
    console.error('Error during OTP verification:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Function to generate OTP
const generateOTP = () => {
  const digits = '0123456789';
  let otp = '';
  for (let i = 0; i < 6; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
};

// Function to send OTP email
const sendOTPEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // Replace with your email service provider (e.g., Gmail, Yahoo)
    auth: {
      user: 'saviidevtest@gmail.com', // Replace with your email address
      pass: 'qcjiifvhtzbzwxzk', // Replace with your email password or app password
    },
  });

  const mailOptions = {
    from: 'saviidevtest@gmail.com', // Replace with your email address
    to: email,
    subject: 'OTP for Verification',
    text: `Your OTP for verification is ${otp}.`,
  };

  await transporter.sendMail(mailOptions);
};
module.exports = router;
