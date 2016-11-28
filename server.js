var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var User = require('./models/user');
// Take the request and convert it into the required format like JSON, url direct entry
// Cannot handle multi part bodies
var bodyParser = require('body-parser');
var ejs = require('ejs');
var ejsMate = require('ejs-mate');
var session = require('express-session');
var cookiePrser = require('cookie-parser');
var flash = require('express-flash');
var mongoStore = require('connect-mongo')(session);
var passport = require('passport');


var secret = require('./config/secret');

var User = require('./models/user');

var app = express();


mongoose.connect(secret.database, function(err){
  if(err){
    console.log(err);
  }
  else {
    console.log("Connected to the server")
  }
})

// Middleware
app.use(express.static(__dirname + '/public')); // This is to tell which folder to look for js and css files in our directory
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookiePrser());
app.use(session({
  resave: true, // THis force to save the session.
  saveUninitialized: true,
  secret: secret.secretKey,
  store: new mongoStore({url: secret.database, autoReconnect:true })
}));
app.use(flash())
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');

var mainRoutes = require('./routes/main')
var userRoutes = require('./routes/user')
app.use('/',mainRoutes);// app.use('/batman', mainRoutes); this will append batman in every main routes
app.use(userRoutes);

// app.get('/name',function(req, res) {
//   var name = "Neaby";
//   res.json("My name is "+name);
// })


app.listen(secret.port, function (err){
  if(err) throw err;
  console.log(" Server is up and running on port "+secret.port);
});
