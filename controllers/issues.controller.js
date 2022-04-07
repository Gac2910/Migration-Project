// CONTROLLER FOR ROUTE
const db = require('../models/index.model');
const issue = db.issues;
const Op = db.Sequelize.Op;

// Render page with ejs
exports.render = (req, res) => {
	res.render("issues", {
		title: "Issues",
		header: "Issues Manager",
		subHeader: "Issues Table"
	});
};

// Create a record
exports.create = (req, res) => {
	let form = req.body;
	issue.create(form)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the issue."
      });
    });
};

// Retrieve all records
exports.findAll = (req, res) => {
	issue.findAll().then(data => {
		res.status(200).send(data);
	});
};

// Retrieve one record by id
exports.findByPk = async (req, res) => {
	let record = await issue.findByPk(req.query.id);
	res.status(200).send(record);
};

// Update a record
exports.update = async (req, res) => {
	let form = req.body;
	await issue.update({
	  description: form.description,
	  status: form.status,
	  severity: form.severity,
	  assigned_to: form.assigned_to,
	}, {
	  where: {id: form.id}
	});
	res.status(200).end();
};

// Delete a record
exports.delete = async (req, res) => {
	let id = req.query.id;
	await issue.destroy({
	  where: {id: id}
	});
	res.status(200).end();
};