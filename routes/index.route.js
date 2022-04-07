
// MODULE BACKEND

const router = require("express").Router();

// conn.connect((err) => {
//     if (err) throw err;
//     console.log("index.js - Connected to Issues Manager");
// });

router.get("/", (req, res) => {
	res.render("index",
	{
		title: "Home",
		header: "Issues Manager",
		subHeader: "Welcome To The Home Page"
	});
});

module.exports = router;