const express = require('express');
const app = express();
const mysql = require('mysql');

app.get('/', (req, res) => {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'leaderboard',
  });

  const queryString = 'SELECT * FROM leaders';

  connection.query(queryString, (err, rows, fields) => {
    if (err) {
      console.log('failed to query leaders: ' + err);
      res.sendStatus(500);
      res.end();
      return;
    }
    console.log('fetched leaders successfully!');

    res.json(rows);
  });

  // res.send({
  //   hi: 'hi there you',
  // });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
