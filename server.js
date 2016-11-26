var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var User = require('./models/user');
// Take the request and convert it into the required format like JSON, url direct entry
// Cannot handle multi part bodies
var bodyParser = require('body-parser');
var ejs = require('ejs');
var ejsMate = require('ejs-mate');


var app = express();


mongoose.connect('mongodb://root:abc1234@ds111188.mlab.com:11188/ecomm', function(err){
  if(err){
    console.log(err);
  }
  else {
    console.log("Connected to the server")
  }
})

// Middleware

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');

app.get('/',function(req, res) {
  res.render("home");
})

app.post('/createUser', function(req, res, next){
  var user = new User();
  user.profile.name =  req.body.name;
  user.password = req.body.password;
  user.email = req.body.email;


  user.save(function(err){
    if(err) return next(err);

    res.json(" Successfully created the user ")
  });
})

// app.get('/name',function(req, res) {
//   var name = "Neaby";
//   res.json("My name is "+name);
// })


app.listen(3000, function (err){
  if(err) throw err;
  console.log(" Server is up and running on port 3000");
});
