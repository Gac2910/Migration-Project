// CONTROLLER FOR ROUTE
const db = require('../models/index.model');
const technician = db.technicians;
const Op = db.Sequelize.Op;

// Render page with ejs
exports.render = (req, res) => {
	res.render("technicians", {
		title: "Technicians",
        header: "Issues Manager",
        subHeader: "Technicians Table"
	});
};

// Create a record
exports.create = (req, res) => {
  let form = req.body;
	technician.create(form)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the technician."
      });
    });
};

// Retrieve all records
exports.findAll = (req, res) => {
	technician.findAll().then(data => {
		res.status(200).send(data);
	});
};

// Retrieve one record by id
exports.findByPk = async (req, res) => {
  let record = await technician.findByPk(req.query.id);
  res.status(200).send(record);
};

// Update a record
exports.update = async (req, res) => {
  let form = req.body;
  await technician.update({
    first_name: form.first_name,
    last_name: form.last_name,
    email: form.email,
    phone_number: form.phone_number,
  }, {
    where: {id: form.id}
  });
  res.status(200).end();
};

// Delete a record
exports.delete = async (req, res) => {
  let id = req.query.id;
  await technician.destroy({
    where: {id: id}
  });
  res.status(200).end();
};