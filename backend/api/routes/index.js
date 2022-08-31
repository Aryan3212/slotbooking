const express = require('express');

const {
  slotListingController,
  slotBookingController
} = require('../controllers');
const router = express.Router();

router.get('/', slotListingController);

router.post('/confirm_slot', slotBookingController);

module.exports = router;
