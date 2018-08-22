const express = require('express');
const app = express();

require('./routes/homeRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js file, or main.css file
  app.use(express.static('clicks-per-min/build'));

  // Express will serve up index.html file,
  // if it does not recognize route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, 'clicks-per-min', 'build', 'index.html'),
    );
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`);
});
