const seed = require('../../db/seed');
const generateUUID = require('../../utils');
let slots = [...seed];

function verifyInterval(start, end) {
  slots.push({ id: 1, start, end });
  slots.sort((a, b) => {
    let aStart = new Date(a.start);
    let bStart = new Date(b.start);
    return aStart - bStart;
  });

  for (let i = 1; i < slots.length; i++)
    if (slots[i - 1].end > slots[i].start) return true;

  return false;
}
function getSlots() {
  let slots = seed;
  return slots.map(({ id, start, end }) => {
    return { start, end };
  });
}

function validInterval(start, end) {
  let startTime = new Date(start);
  let endTime = new Date(end);
  if (startTime >= endTime) return false;
  return Math.round(new Date(start) - new Date(end) / 60000) % 15 === 0;
}

function saveSlot(start, end, cb) {
  if (validInterval(start, end) && !verifyInterval(start, end)) {
    const id = generateUUID();
    seed.push({ id: id, start, end });
    cb({
      err: undefined,
      id: id,
      start: start,
      end: end,
      message: 'Slot saved'
    });
  } else {
    cb({ err: new Error('Error'), message: 'Verification failed' });
  }
}

module.exports = { saveSlot, getSlots };
