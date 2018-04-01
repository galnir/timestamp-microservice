var moment     = require('moment');
var bodyParser = require('body-parser');
   var express = require('express');
   var app     = express();
         moment().format();

app.set("view engine", "ejs"); // set ejs as the view engine

app.use(bodyParser.json());

//ROUTES 
//root route
app.get("/", function (req, res) {
    res.render("home");
});

//show route
app.get("/:timestamp", function (req, res) {
    var timestamp = req.params.timestamp;
    var convertDate = Date.parse(timestamp.match(/[a-zA-Z]+|[0-9]+/g).join(" "));
    console.log(convertDate);
    if (!isNaN(timestamp)) { // if input is a unix num
        var formattedDate = moment.unix(timestamp).format("MMMM D, GGGG");  //convert the unix num to natural date
        res.send({
            unix: timestamp,
            natural: formattedDate
        });
    } else if (!isNaN(convertDate)) { //else if the input is a natural date
        var formattedDate = moment(timestamp).format('X'); // convert the natural date to unix
        var timestamp = moment.unix(formattedDate).format("MMMM D, GGGG");  // fix the format of the natural date
        res.send({
            unix: formattedDate,
            natural: timestamp
        });
    } else {    //input does not contain a date or unix timestamp => return null on both unix and natural
        res.send({
            unix: null,
            natural: null
        });
    }
});

// listen for requests :)

app.listen(3000, function () { //listen to localhost
    console.log("listening on port 3000");
});

/* const listener = app.listen(process.env.PORT, () => { //glitch port
    console.log(`Your app is listening on port ${listener.address().port}`)
  }) */