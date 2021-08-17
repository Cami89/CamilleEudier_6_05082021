const router = require('express').Router();
const sauceRouter = require('./sauces/sauces.routes');
const userRouter = require('./user/user.routes');

router.use('/sauces', sauceRouter);
router.use('/auth', userRouter);

module.exports = router;