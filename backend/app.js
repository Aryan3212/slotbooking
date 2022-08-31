if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT;
const routes = require('./api/routes/index.js');
const db = require('./db');

db.openDB();

app.use(cors());
app.use(express.json());
app.use('/', routes);
const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

process.on('SIGTERM', () => {
  server.close(() => {
    db.closeDB();
  });
});
