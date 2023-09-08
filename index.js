// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

const invalidDate = (date) => date.toUTCString() === "Invalid Date";

app.get("/api/?", (req, res) => {
 // const url = new URL(req.url);
 let reqString = req.url.split("=");
 const params = reqString[1];

   let date = new Date(reqString[1]);
   console.log(date);

   if (invalidDate(date)) {
    date = new Date(+reqString[1]);
   }
   console.log(date);  

  if (invalidDate(date)) {
      res.json({error: "Invalid Date"});
      return
  } else {
    res.json ({
    unix: date.getTime(),
    utc: date.toUTCString()
    });
  }
});

app.get("/api/:date", (req, res) => {
  let date = new Date(+req.params.date);

   if (invalidDate(date)) {
    date = new Date(req.params.date);
   }

  if (invalidDate(date)) {
    res.json({error: "Invalid Date"})
    return
  } else {
    res.json ({
    unix: date.getTime(),
    utc: date.toUTCString()
    });
  }
});

app.get("/api/", (req, res) => {
  let date = new Date();
  res.json ({
    unix: date.getTime(),
    utc: date.toUTCString()
  });  
});

// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port 3000');
});


