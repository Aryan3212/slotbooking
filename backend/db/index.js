const sqlite3 = require('sqlite3').verbose();
const { seed } = require('./seed');
const { generateUUID } = require('../utils');

let db;
let open = false;

function openDB() {
  if (open) {
    console.log('Already opened.');
    return;
  }
  db = new sqlite3.Database(
    './slots.db',
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    (err) => {
      if (err && err.code == 'SQLITE_CANTOPEN') {
        createDatabase();
        console.log('db created');
        return;
      } else if (err) {
        console.log('Getting error ' + err);
      }
    }
  );
  open = true;
}

function createDatabase() {
  var newdb = new sqlite3.Database('./slots.db', (err) => {
    if (err) {
      console.log('Getting error ' + err);
    }
    createTables(newdb);
  });
}
function createTables(newdb) {
  newdb.exec(
    `create table slots (
      id int primary key not null,
      start DATETIME,
      end DATETIME,
  );`,
    () => {
      seedDB();
    }
  );
}
function seedDB() {
  let placeholders = seed.map(() => '(?)').join(',');
  let sql = 'INSERT INTO slots(id,start,end) VALUES ' + placeholders;
  db.run(sql, seed, function (err) {
    if (err) {
      return console.error(err.message);
    }
    console.log(`Rows inserted ${this.changes}`);
  });
}
function insertTimeSlot(from, to) {
  const uuid = generateUUID();

  db.run(`INSERT INTO langs(name) VALUES(?)`, ['C'], function (err, row) {
    if (err) {
      return console.log(err.message);
    }
    // get the last insert id
    console.log(`A row has been inserted with rowid ${row.id}`);
  });
}

function getTimeSlot(date, duration) {
  let sql = `SELECT * FROM slots`;
  db.get(sql, (err, row) => {
    if (err) {
      return console.error(err.message);
    }
    return row;
  });
}

function closeDB() {
  if (!open) {
    console.log('Already closed.');
    return;
  }
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Close the database connection.');
  });
  open = false;
}

module.exports = { openDB, closeDB, insertTimeSlot, getTimeSlot };
