const router = require('express').Router();

const Users = require('./userModel.js');
const restrictedRoute = require('../auth/tokenMiddleware.js');
const checkDepartment = require('../auth/checkDepartment')

router.get('/', restrictedRoute,  (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});


module.exports = router;
