const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// Import the necessary models
const User = require('../models/userData');

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  // Assuming you have a property "isAdmin" in your User model
  const user = req.user; // Assuming user data is stored in the "user" property of the request object
  if (user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: 'Unauthorized' });
  }
};

// Route to create a new password when user forgets password
// router.put('/password/reset', [
//   check('email').isEmail().withMessage('Invalid email'),
//   check('newPassword').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
// ], async (req, res) => {
//   try {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     // Code to update the password

//     res.status(200).json({ message: 'Password updated successfully' });
//   } catch (error) {
//     console.error('Error updating password:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

// Route to create a new password when user forgets password
router.put('/password/reset', [
  check('email').isEmail().withMessage('Invalid email'),
  check('newPassword').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, newPassword } = req.body;

    // Find the user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password with the hashed password
    user.userPassword = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Route to update user data (excluding password)
router.put('/:id', isAdmin, async (req, res) => {
  try {
    // Code to update user data (excluding password)

    res.status(200).json({ message: 'User data updated successfully' });
  } catch (error) {
    console.error('Error updating user data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route to get all users (only accessible by admin)
router.get('/', isAdmin, async (req, res) => {
  try {
    // Code to get all users

    res.status(200).json(users);
  } catch (error) {
    console.error('Error getting all users:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route to get a user by ID (only accessible by admin)
router.get('/:id', isAdmin, async (req, res) => {
  try {
    // Code to get a user by ID

    res.status(200).json(user);
  } catch (error) {
    console.error('Error getting user by ID:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route to get user statistics (only accessible by admin)
router.get('/stats', isAdmin, async (req, res) => {
  try {
    const today = new Date();
    const lastYear = today.setFullYear(today.getFullYear() - 1);

    const monthsArray = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    // Code to calculate user statistics

    res.status(200).json(data);
  } catch (error) {
    console.error('Error getting user statistics:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route to delete a user by ID (only accessible by admin)
router.delete('/:id', isAdmin, async (req, res) => {
  try {
    // Code to delete a user by ID

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user by ID:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route to delete all users (only accessible by admin)
router.delete('/', isAdmin, async (req, res) => {
  try {
    // Code to delete all users

    res.status(200).json({ message: 'All users deleted successfully' });
  } catch (error) {
    console.error('Error deleting all users:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
