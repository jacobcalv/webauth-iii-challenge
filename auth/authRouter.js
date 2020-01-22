const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const UserModel = require('../users/userModel');

router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 15);
    user.password = hash;

    UserModel.add(user)
        .then(newUser => {
            res.status(201).json(newUser)
        })
        .catch(error => {
            res.status(500).json(error)
        })
})

router.post('/login', (req, res) => {
    let {username, password} = req.body;

    UserModel.findBy({username})
        .first()
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)) {
                const token = signToken(user)
                res.status(200).json({
                    token,
                    message: 'success'
                }); 
            } else {
                res.status(401).json({message: 'invalid login information'})    
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
})

function signToken(user) {
    UserModel.findBy(user.username)
    .first()
    .then(user => {
        const department = user.department
    })
    const payload = {
      username: user.username,
      department: department
    };
    const secret = process.env.JWT_SECRET
  
    const options = {
      expiresIn: "1hr"
    }
    return (jwt.sign(payload, secret, options))
  }

module.exports = router;