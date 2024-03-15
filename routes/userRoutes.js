const router = require('express').Router();
const { User } = require('../models/User');
const Joi = require('joi');

// Define schema for user creation payload
const userSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

// Middleware to validate user creation payload using Joi schema
function validateUser(req, res, next) {
  const { error } = userSchema.validate(req.body);
  if (error) {
      return res.status(400).json({ message: error.details[0].message });
  }
  next();
}

// GET all users
router.get('/', async (req, res) => {
  try {
    console.log("GET /api/users - Fetching all users");
    const users = await User.find().populate('thoughts').populate('friends');
    console.log("GET /api/users - Users fetched successfully");
    res.json(users);
  } catch (err) {
    console.error("GET /api/users - Error:", err);
    res.status(500).json(err);
  }
});

// GET a single user by its _id
router.get('/:userId', async (req, res) => {
  try {
    console.log(`GET /api/users/${req.params.userId} - Fetching user by id: ${req.params.userId}`);
    const user = await User.findById(req.params.userId)
      .populate('thoughts')
      .populate('friends');
    console.log(`GET /api/users/${req.params.userId} - User fetched successfully`);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json(user);
  } catch (err) {
    console.error(`GET /api/users/${req.params.userId} - Error:`, err);
    res.status(500).json(err);
  }
});

// POST a new user
router.post('/', async (req, res) => {
  try {
    console.log("POST /api/users - Creating a new user");
    const user = await User.create(req.body);
    console.log("POST /api/users - User created successfully");
    res.status(201).json(user);
  } catch (err) {
    console.error("POST /api/users - Error:", err);
    res.status(400).json(err);
  }
});

// PUT to update a user by its _id
router.put('/:userId', async (req, res) => {
  try {
    console.log(`PUT /api/users/${req.params.userId} - Updating user by id: ${req.params.userId}`);
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      req.body,
      { new: true }
    );
    console.log(`PUT /api/users/${req.params.userId} - User updated successfully`);
    if (!updatedUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json(updatedUser);
  } catch (err) {
    console.error(`PUT /api/users/${req.params.userId} - Error:`, err);
    res.status(400).json(err);
  }
});

// DELETE to remove user by its _id
router.delete('/:userId', async (req, res) => {
  try {
    console.log(`DELETE /api/users/${req.params.userId} - Deleting user by id: ${req.params.userId}`);
    const deletedUser = await User.findByIdAndDelete(req.params.userId);
    console.log(`DELETE /api/users/${req.params.userId} - User deleted successfully`);
    if (!deletedUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json(deletedUser);
  } catch (err) {
    console.error(`DELETE /api/users/${req.params.userId} - Error:`, err);
    res.status(500).json(err);
  }
});

module.exports = router;