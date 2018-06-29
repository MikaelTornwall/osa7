const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')

loginRouter.post('/', async (req, res) => {
  const body = req.body

  const user = await User.findOne({ username: body.username })
  const passwordCorrect = user === null ?
  false :
  await bcrypt.compare(body.password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return res.status(401).send({ error: 'username or password invalid' })
  }

  const userForToken = {
    username: user.username,
    id: user._id
  }

const token = jwt.sign(userForToken, process.env.SECRET)

res.status(200).send({
  token,
  username: user.username,
  name: user.name
})
})

module.exports = loginRouter
