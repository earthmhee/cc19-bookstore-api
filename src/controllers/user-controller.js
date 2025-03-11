const prisma = require("../models/index");

exports.listBooks = async (req, res, next) => {
  // code
  try {
    const books = await prisma.book.findMany({
      include: {
        publisher: true,
      },
    });
    // console.log(users);
    res.json({ result: books });
  } catch (error) {
    next(error);
  }
};
exports.updateUserInfo = async (req, res, next) => {
  // code
  try {
    const { firstName, lastName, email, phoneNumber, age, address } = req.body;
    // console.log(id);
    console.log(req.body);
    
    const userId = req.user.id; // Assuming your auth middleware adds user ID to the request
    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          firstName,
          lastName,
          email,
          phoneNumber,
          age: age ? parseInt(age) : undefined,
          address,
          updatedAt: new Date(),
        },
      });
      const { password, ...userWithoutPassword } = updatedUser;
    // console.log(users);
    res.json({ user: updatedUser, message: "User updated successfully" });
  } catch (error) {
    next(error);
  }
};
