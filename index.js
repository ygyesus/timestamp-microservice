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


// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api", (req, res)=>{
  const utc = new Date().toUTCString()

  const unix = new Date().getTime()
  res.json({unix,utc})
})
app.get("/api/:myDate", (req,res)=>{
  let myDate = req.params.myDate
  console.log(myDate)
  if (Number(myDate)){
    myDate = Number(myDate)
  }

  if (new Date(myDate) == "Invalid Date"){
    return res.json({
      error: "Invalid Date"
    })
  }

  const object = {
    "unix": new Date(myDate).getTime(),
    "utc": new Date(myDate).toUTCString()
  }
  res.json(object)

})



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
