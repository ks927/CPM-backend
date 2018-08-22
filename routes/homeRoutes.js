const mysql = require('mysql');

module.exports = (app) => {
  app.get('/api/leaderboard', (req, res) => {
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
  });
};
