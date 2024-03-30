var express = require('express');
var app = express();
var uuid = require('node-uuid');

const { Pool } = require('pg');

//var conString = process.env.DB; // "postgres://username:password@localhost/database";
//var conString = "postgresql://myuser:mypassword@localhost:5432/postgres";

//var conString = "postgresql://postgres:password@wireapps.c3qk0ywowvqc.ap-southeast-1.rds.amazonaws.com:5432/wireapps";




// Define the connection configuration
const pool = new Pool({
  user: 'myuser',
  host: 'localhost',
  database: 'wireapps',
  password: 'mypassword',
  port: 5432, // Default PostgreSQL port
});

// Define the route for the /api/status endpoint
app.get('/api/status', (req, res) => {
  // Connect to the database and execute the query
  pool.query('SELECT NOW() as current_time', (err, result) => {
    if (err) {
      console.error('Error fetching time:', err);
      res.status(500).send('Error fetching time from the database');
    } else {
      // Extract the current time from the query result
      const currentTime = result.rows[0].current_time;

      // Send the current time as the API response
      res.json({
        request_uuid: uuid.v4(),
        time: currentTime
      });
    }
  });
});






// Routes
// app.get('/api/status', function(req, res) {
//   pg.connect(conString, function(err, client, done) {
//     if(err) {
//       return res.status(500).send('error fetching client from pool');
//     }
//     client.query('SELECT now() as time', [], function(err, result) {
//       //call `done()` to release the client back to the pool
//       done();

//       if(err) {
//         return res.status(500).send('error running query');
//       }

//       return res.json({
//         request_uuid: uuid.v4(),
//         time: result.rows[0].time
//       });
//     });
//   });
// });

// Define a route for the homepage
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Define a route for test api
app.get('/api/test', (req, res) => {
  res.send('test api!');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});


module.exports = app;
