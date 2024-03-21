const router = require('express').Router();
const { Thought, User } = require('../models/Thought');
const Joi = require('joi');

// Define schema for thought creation payload
const thoughtSchema = Joi.object({
  thoughtText: Joi.string().required(),
  username: Joi.string().required(),
  userId: Joi.string().required(),
});

// Middleware to validate thought creation payload using Joi schema
function validateThought(req, res, next) {
  const { error } = thoughtSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
}

// GET all thoughts
router.get('/', async (req, res) => {
  try {
    console.log("GET /api/thoughts - Fetching all thoughts");
    const thoughts = await Thought.find().populate('reactions');
    console.log("GET /api/thoughts - Thoughts fetched successfully");
    res.json(thoughts);
  } catch (err) {
    console.error("GET /api/thoughts - Error:", err);
    res.status(500).json(err);
  }
});

// GET a single thought by its _id
router.get('/:thoughtId', async (req, res) => {
  try {
    console.log(`GET /api/thoughts/${req.params.thoughtId} - Fetching thought by id: ${req.params.thoughtId}`);
    const thought = await Thought.findById(req.params.thoughtId).populate('reactions');
    console.log(`GET /api/thoughts/${req.params.thoughtId} - Thought fetched successfully`);
    if (!thought) {
      res.status(404).json({ message: 'Thought not found' });
      return;
    }
    res.json(thought);
  } catch (err) {
    console.error(`GET /api/thoughts/${req.params.thoughtId} - Error:`, err);
    res.status(500).json(err);
  }
});

// POST to create a new thought
router.post('/', validateThought, async (req, res) => {
  try {
    console.log("POST /api/thoughts - Creating a new thought");
    const thought = await Thought.create(req.body);
    console.log("POST /api/thoughts - Thought created successfully");
    // Push the created thought's _id to the associated user's thoughts array field
    const user = await User.findByIdAndUpdate(
      req.body.userId,
      { $push: { thoughts: thought._id } },
      { new: true }
    );
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.status(201).json(thought);
  } catch (err) {
    console.error("POST /api/thoughts - Error:", err);
    res.status(400).json(err);
  }
});

// PUT to update a thought by its _id
router.put('/:thoughtId', async (req, res) => {
  try {
    console.log(`PUT /api/thoughts/${req.params.thoughtId} - Updating thought by id: ${req.params.thoughtId}`);
    const updatedThought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      req.body,
      { new: true }
    );
    console.log(`PUT /api/thoughts/${req.params.thoughtId} - Thought updated successfully`);
    if (!updatedThought) {
      res.status(404).json({ message: 'Thought not found' });
      return;
    }
    res.json(updatedThought);
  } catch (err) {
    console.error(`PUT /api/thoughts/${req.params.thoughtId} - Error:`, err);
    res.status(400).json(err);
  }
});

// DELETE to remove a thought by its _id
router.delete('/:thoughtId', async (req, res) => {
  try {
    console.log(`DELETE /api/thoughts/${req.params.thoughtId} - Deleting thought by id: ${req.params.thoughtId}`);
    const deletedThought = await Thought.findByIdAndDelete(req.params.thoughtId);
    console.log(`DELETE /api/thoughts/${req.params.thoughtId} - Thought deleted successfully`);
    if (!deletedThought) {
      res.status(404).json({ message: 'Thought not found' });
      return;
    }
    res.json(deletedThought);
  } catch (err) {
    console.error(`DELETE /api/thoughts/${req.params.thoughtId} - Error:`, err);
    res.status(500).json(err);
  }
});

// POST to create a reaction stored in a single thought's reactions array field
router.post('/:thoughtId/reactions', async (req, res) => {
  try {
    console.log(`POST /api/thoughts/${req.params.thoughtId}/reactions - Adding reaction to thought id: ${req.params.thoughtId}`);
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      res.status(404).json({ message: 'Thought not found' });
      return;
    }
    thought.reactions.push(req.body);
    const updatedThought = await thought.save();
    console.log(`POST /api/thoughts/${req.params.thoughtId}/reactions - Reaction added successfully`);
    res.status(201).json(updatedThought);
  } catch (err) {
    console.error(`POST /api/thoughts/${req.params.thoughtId}/reactions - Error:`, err);
    res.status(400).json(err);
  }
});

// DELETE to pull and remove a reaction by the reaction's reactionId value
router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
  try {
    console.log(`DELETE /api/thoughts/${req.params.thoughtId}/reactions/${req.params.reactionId} - Removing reaction with id: ${req.params.reactionId}`);
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      res.status(404).json({ message: 'Thought not found' });
      return;
    }
    thought.reactions = thought.reactions.filter(
      reaction => reaction.reactionId.toString() !== req.params.reactionId
    );
    const updatedThought = await thought.save();
    console.log(`DELETE /api/thoughts/${req.params.thoughtId}/
    reactions/${req.params.reactionId} - Reaction removed successfully`);
    res.json(updatedThought);
  } catch (err) {
    console.error(`DELETE /api/thoughts/${req.params.thoughtId}/reactions/${req.params.reactionId} - Error:`, err);
    res.status(500).json(err);
  }
});

module.exports = router;