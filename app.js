var moment = require('moment'),
    bodyParser = require('body-parser');
express = require('express'),
    app = express()
moment().format();

app.set("view engine", "ejs");

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
    if (!isNaN(timestamp)) { // if input is a unix num
        var formattedDate = moment.unix(timestamp).format("MMMM D, GGGG");
        res.send({
            unix: timestamp,
            natural: formattedDate
        });
    } else if (!isNaN(convertDate)) { //else if the input is a natural date
        var formattedDate = moment(timestamp).format('X');
        var timestamp = moment.unix(formattedDate).format("MMMM D, GGGG");
        res.send({
            unix: formattedDate,
            natural: timestamp
        });
    } else {    //input does not contain a date or unix timestamp
        res.send({
            unix: null,
            natural: null
        });
    }
});

app.listen(3000, function () { //listen to localhost
    console.log("listening on port 3000");
});

/* const listener = app.listen(process.env.PORT, () => { //glitch port
    console.log(`Your app is listening on port ${listener.address().port}`)
  }) */