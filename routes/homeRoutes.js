const mysql = require('mysql');

module.exports = (app) => {
  function getConnection() {
    return mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'leaderboard',
    });
  }

  app.get('/api/leaderboard', (req, res) => {
    const queryString = 'SELECT * FROM leaders';

    getConnection().query(queryString, (err, rows, fields) => {
      if (err) {
        console.log('failed to query leaders: ' + err);
        res.sendStatus(500);
        res.end();
        return;
      }
      console.log('fetched leaders successfully!');

      res.json(rows);
    });
  });

  app.post('/api/leaderboard', (req, res) => {
    console.log('POST request body', req.body);
    const { username, score } = req.body;

    const queryString = 'INSERT INTO leaders (username, score) VALUES (?, ?)';

    getConnection().query(
      queryString,
      [username, score],
      (err, results, fields) => {
        if (err) {
          console.log('failed to post score: ' + err);
          res.sendStatus(500);
          res.end();
          return;
        }
        console.log('inserted the username and score!', results.insertId);
        res.end();
      },
    );
  });
};
