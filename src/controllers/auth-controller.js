const jwt = require('jsonwebtoken')
const prisma = require('../models/index')
const bcrypt = require('bcryptjs')

const createError = require("../utils/createError");
const tryCatch = require('../utils/tryCatch');

// function checkEmailorMobile(identity) {
// 	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// 	const mobileRegex = /^[0-9]{10,15}$/

// 	let identityKey = ''
// 	if (emailRegex.test(identity)) {
// 		identityKey = 'email'
// 	}
// 	if (mobileRegex.test(identity)) {
// 		identityKey = 'mobile'
// 	}
// 	if (!identityKey) {
// 		createError(400, 'only Email or Mobile phone')
// 	}
// 	return identityKey
// }

module.exports.register = tryCatch(async (req, res, next) => {
	const { username, firstName, lastName, password, confirmPassword,email,age,address,phoneNumber,urlImage } = req.body
		// validation

		// identity เป็น email หรือ mobile phone number
		// const identityKey = checkEmailorMobile(identity)

		// หาว่ามี user นี้แล้วหรือยัง
		const findIdentity = await prisma.user.findUnique({
			where: { username: username }
		})
		if (findIdentity) {
			createError(409, `Already have this user : ${username}`)
		}

		// เตรียมข้อมูล new user + hash password
		const newUser = {
			username: username,
			password: await bcrypt.hash(password, 10),
			firstName: firstName,
			lastName: lastName,
			email: email,
			age: age,
			address: address,
			phoneNumber: phoneNumber,
			urlImage: urlImage
		}
		// สร้าง new user ใน database 
		const result = await prisma.user.create({ data: newUser })
		console.log(result)
		res.json({ msg: `Register successful`, result })
})

module.exports.login = tryCatch(async (req, res, next) => {
	
	const { username, password } = req.body
	// validation
	if (!username.trim() || !password.trim()) {
		createError(400, 'Please fill all data')
	}

	// identity เป็น email หรือ mobile phone number
	// const identityKey = checkEmailorMobile(identity)

	// find user
	const foundUser = await prisma.user.findUnique({
		where: { username : username}
	})

	if(!foundUser) {
		createError(401, 'Invalid Login')
	}

	// check password
	let pwOk = await bcrypt.compare(password, foundUser.password)
	if(!pwOk) {
		createError(401, 'Invalid Login')
	}

	// create jwt token

	const payload = { id: foundUser.id }
	const token = jwt.sign(payload, process.env.JWT_SECRET, { 
		expiresIn : '30d'
	})

	// delete foundUser.password
	// delete foundUser.createdAt
	// delete foundUser.updatedAt

	const { password : pw, createdAt, updatedAt, ...userData  } = foundUser

	res.json({ msg: 'Login successful', token: token, user: userData })
})

module.exports.getMe = (req, res) => {
	res.json({ user: req.user })
}