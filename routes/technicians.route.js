// ROUTE
const technicians = require('../controllers/technicians.controller');
let router = require("express").Router();
router.get('/', technicians.render);
router.get('/all', technicians.findAll);
router.put('/update', technicians.update);
router.post('/create', technicians.create);
router.delete('/delete', technicians.delete);
router.get('/findByPk', technicians.findByPk);

module.exports = router;