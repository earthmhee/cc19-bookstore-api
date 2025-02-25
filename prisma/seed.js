const prisma = require('../models')
const bcrypt = require('bcryptjs')

const hashedPassword = bcrypt.hashSync('123456', 10)

const userData = [
	{
		username : andycc19 ,firstName: 'Andy', lastName: 'Codecamp', password: hashedPassword, email: 'andy@ggg.mail',phoneNumber: '3333333333',
		urlImage: 'https://www.svgrepo.com/show/420364/avatar-male-man.svg'
	},
	{
		username : bobbycc19 ,firstName: 'Bobby', lastName: 'Codecamp', password: hashedPassword, email: 'bobby@ggg.mail',phoneNumber: '4444444444',
		urlImage: 'https://www.svgrepo.com/show/420319/actor-chaplin-comedy.svg'
	},
	{
		username : candycc19 ,firstName: 'Candy', lastName: 'Codecamp', password: hashedPassword, email: 'candy@ggg.mail',phoneNumber: '5555555555',
		urlImage: 'https://www.svgrepo.com/show/420327/avatar-child-girl.svg'
	},
	{
		username : dannycc19 ,firstName: 'Danny', lastName: 'Codecamp', password: hashedPassword, email: 'danny@ggg.mail',phoneNumber: '6666666666',
		urlImage: 'https://www.svgrepo.com/show/420314/builder-helmet-worker.svg'
	},
]


console.log('DB seed...')

async function seedDB() {
	await prisma.user.createMany({ data: userData})
}

seedDB()

// npx prisma db seed
