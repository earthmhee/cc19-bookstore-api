const express = require('express');
const { validateWithZod, registerUser, loginUser } = require('../middlewares/validator');
const { register, login, getMe } = require('../controllers/auth-controller');
const authenticate = require('../middlewares/authenticate');
const authRoute = express.Router()
// const {register, login, getMe} = require('../controllers/auth-controller')
// const authenticate = require('../middlewares/authenticate')


//ENDPOINT http://localhost:8050/auth/register
authRoute.post('/register', validateWithZod(registerUser), register)
//ENDPOINT http://localhost:8050/auth/login
authRoute.post('/login', validateWithZod(loginUser),login )
//ENDPOINT http://localhost:8050/auth/me
authRoute.get('/me', authenticate, getMe )


module.exports = authRoute