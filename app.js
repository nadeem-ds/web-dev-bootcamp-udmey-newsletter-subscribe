const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(express.static("public"));

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// app.get("/", function (req, res) {
//   res.send("server get req");
// });

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  console.log(req.body);
  const fname = req.body.fname;
  const lname = req.body.lname;
  const email = req.body.email;

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: fname,
          LNAME: lname,
        },
      },
    ],
  };

  var jsonData = JSON.stringify(data);
  const options = {
    method: "POST",
    auth: "Nad:4e374dbccb5407cd1184be0157d37f0c-us18",
  };
  const url = "https://us18.api.mailchimp.com/3.0/lists/2d5e6ddf66";
  const request = https.request(url, options, function (response) {
    console.log(
      "------------------------response code--------------" +
        response.statusCode
    );
    if (response.statusCode === 200) {
      //   res.send("code is 200");
      res.sendFile(__dirname + "/success.html");
    } else {
      //   res.send("There was error while signing news letter");
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function (data) {
      //   console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();
  //   res.send("your name is " + fname + " " + lname + " and ur email is" + email);
  //   console.log("Logs will come here");
});

app.post("/failure", function (req, res) {
  res.redirect("/");
});

app.post("/success", function (req, res) {
  res.send("Success page");
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Express server running on 3000");
});

// API Key
// 4e374dbccb5407cd1184be0157d37f0c-us18
// 2d5e6ddf66
