var MainController = require('./main.controller'),
 passport = require('passport');

function setupRoutes(app){
	app.get('/home',MainController.home);
	app.get('/disconnect',MainController.disconnectView);
	app.post('/login',passport.authenticate('local', { successRedirect: '/',
											failureRedirect: '/login',
											failureFlash: true}));
}

module.exports = setupRoutes;