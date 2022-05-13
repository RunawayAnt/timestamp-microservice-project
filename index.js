// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api", function(req, res) {
  // time current
  let current = new Date();

  res.json({
    unix: current.getTime(),
    utc: current.toUTCString()
  });
})

app.get("/api/:date", function(req, res) {
  // time defined
  let date_string = req.params.date;
  //   let time = new Date(date_string);
  //   let timestamp = {};
  //   if (time) {
  //     timestamp = {
  //       time: time
  //     };
  //   } else {
  //     timestamp = { error: time };
  //   }
  //   res.json(timestamp);
  // });
  let json_date = {};

  if (+date_string) {
    console.log('is number');
    json_date = {
      unix: +date_string,
      utc: new Date(+date_string).toUTCString()
    };

  } else {
    console.log('is string');
    let date_select = new Date(date_string);
    if (date_select == 'Invalid Date') {
      json_date = { error: "Invalid Date"};
    } else {
      json_date = {
        unix: Date.parse(date_select),
        utc: new Date(date_select).toUTCString()
      };
    }
  }
 res.json(json_date);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
