//middleware
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const middleware = [helmet(), cors(), express.json()]


//routers
const authRouter = require('../auth/authRouter.js');
const usersRouter = require('../users/userRouter.js');

const server = express();

server.use(middleware)

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

server.get("/", (req, res) => {
    res.json({
      message: "API IN SESSION",
      success: "true"
    })
  })
  
server.use((err, req, res, next) => {
    console.log("Error:", err)
  
    res.status(500).json({
      message: "Something went wrong",
    })
  })
  
  
  module.exports = server