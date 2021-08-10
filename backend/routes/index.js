const router = require('express').Router();
const sauceRouter = require('./sauces/sauces.routes');
const userRouter = require('./user/user.routes');

router.use('/sauces', sauceRouter);
router.use('/user', userRouter);

module.exports = router;