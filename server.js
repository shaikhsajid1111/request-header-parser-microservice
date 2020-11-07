// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();

// our default array of dreams
const dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204
// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

// send the default array of dreams to the webpage
app.get("/dreams", (request, response) => {
  // express helps us take JS objects and send them as JSON
  response.json(dreams);
});
  var accepts = require('accepts');
  var uaParser = require('ua-parser');

const requestIp = require("request-ip");

var middlewareIp = (req,res,next) =>{
  const clientIp = requestIp.getClientIp(req);
  next();
}

app.use(requestIp.mw());

app.get("/api/whoami",(req,res) => {
  var ip = req.clientIp;
  var language = accepts(req).languages()[0];
  var uaHeader = req.headers['user-agent'];
  //var agent = uaParser.parseOS(uaHeader).toString();
  res.json({
    "ipaddress":ip,
    "language" : language,
    "software" : uaHeader
  })
})


// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
