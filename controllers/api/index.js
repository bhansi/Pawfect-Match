const router = require('express').Router();
const userRoutes = require('./userRoutes');
const employeeRoutes = require('./employeeRoutes');

router.use('/employee', employeeRoutes);
router.use('/user', userRoutes);

module.exports = router;
