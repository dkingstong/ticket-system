import Users from '../models/users.js'

export const createUser = async(user) => {
  const newUser = await Users.create({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    hashedPassword: user.password,
    role: user.role
  })
  return newUser
}