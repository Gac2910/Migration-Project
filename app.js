// SERVER BACKEND
const express = require("express");
const app = express();
const port = 8888;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(__dirname + "/public"));

app.use("/", require("./routes/index.route"));
app.use("/issues", require("./routes/issues.route"));
app.use("/technicians", require("./routes/technicians.route"));

const db = require('./models/index.model');
db.sequelize.sync().then(() => {
	app.listen(port, () => {
		console.log("Listening On Port " + port);
	});
}).catch(err => {
	throw err
});