var express = require('express');
var app = express();

var path = require('path');
app.set('views', path.join(__dirname, 'lib','views'));
app.set('view engine','jade');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');

app.use(express.static(path.join(__dirname,'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieSession({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());


var setupMainRoutes = require('./lib/main/routes');
setupMainRoutes(app);

var server = app.listen(4000,function(){
	console.log("Express server listening on port 4000");
});

// Configuring LocalStrategy for Passport
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));