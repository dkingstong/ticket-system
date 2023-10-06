import express from 'express'
import passport from 'passport'
import Users from '../models/users.js'


const router = express.Router()

router.post('/', async(req, res) => {
  const user = req.body;
  await Users.create({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    hashedPassword: user.password,
    role: user.role
  })
  res.status(200).send('user created successfully')
})

router.post('/login',
passport.authenticate('local', { failureRedirect: 'http://localhost:3000', failureMessage: true }),
 async(req, res) => {
  res.redirect('http://localhost:3000/home');
})

export default router;

