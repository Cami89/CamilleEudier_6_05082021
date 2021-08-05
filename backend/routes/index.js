const router = require('express').Router();
const sauceRouter = require('./sauces/sauces.routes');
const authRouter = require('./auth/auth.routes');

router.use('/sauces', sauceRouter);
router.use('/auth', authRouter);

module.exports = router;