const router = require('express').Router();
const userRoutes = require('./userRoutes');
const employeeRoutes = require('./employeeRoutes');
const clientRoutes = require('./clientRoutes');

router.use('/user', userRoutes);
router.use('/employee', employeeRoutes);
router.use('/client', clientRoutes);

module.exports = router;
