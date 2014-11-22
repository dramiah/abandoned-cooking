module.exports = {
	home: function(req,res){
		res.send("Welcome to Abandon Cooking!  You've succesfully logged in.");
	},
	disconnectView: function(req,res) {
		res.render('disconnect',{title:'Abandon Cooking'});
	}
};