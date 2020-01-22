const router = require('express').Router();

const Users = require('./userModel.js');
const restrictedRoute = require('../auth/tokenMiddleware.js');

router.get('/', restrictedRoute,  (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});


module.exports = router;
