const router = require('express').Router();
const { Thought } = require('../../models');
const appRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes');

router.use('/Thoughts', thoughtRoutes);
router.use('/Users', userRoutes);

module.exports = router;