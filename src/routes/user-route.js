const express = require('express');
const { validateWithZod, registerUser, loginUser } = require('../middlewares/validator');
const { register, login, getMe } = require('../controllers/auth-controller');
const authenticate = require('../middlewares/authenticate');
const { listBooks, updateUserInfo } = require('../controllers/user-controller');
const userRoute = express.Router()
// const {register, login, getMe} = require('../controllers/auth-controller')
// const authenticate = require('../middlewares/authenticate')


//ENDPOINT http://localhost:8050/auth/books
userRoute.get('/books', authenticate, listBooks )
//ENDPOINT http://localhost:8050/auth/update-profile
userRoute.patch('/update-profile', authenticate, updateUserInfo)
//ENDPOINT http://localhost:8050/auth/login
userRoute.post('/login', validateWithZod(loginUser),login )

http://localhost:8050/auth/update-profile
module.exports = userRoute