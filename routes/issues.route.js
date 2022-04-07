// ROUTE
const issues = require('../controllers/issues.controller');
let router = require("express").Router();
router.get('/', issues.render);
router.get('/all', issues.findAll);
router.put('/update', issues.update);
router.post('/create', issues.create);
router.delete('/delete', issues.delete);
router.get('/findByPk', issues.findByPk);

module.exports = router;