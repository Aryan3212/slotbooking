const { getSlots, saveSlot } = require('../models');

function slotListingController(req, res) {
  const slots = getSlots();
  res.send(JSON.stringify(slots));
}

function slotBookingController(req, res) {
  const { start, end } = req.body;
  saveSlot(start, end, ({ err, id, start, end }) => {
    if (err) {
      res.sendStatus(500);
      console.log(err);
    } else {
      res.send(JSON.stringify({ id, start, end }));
    }
  });
}

module.exports = { slotBookingController, slotListingController };
