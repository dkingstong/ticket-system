import express from 'express'
import passport from 'passport'
import { createUser } from '../controllers/userController'

const router = express.Router()

router.post('/', async(req, res) => {
  const user = req.body;
  const newUser = await createUser(user)
  
  res.status(200).json({newUser})
})

router.post('/login',
passport.authenticate('local', { failureRedirect: 'http://localhost:3000', failureMessage: true }),
 async(req, res) => {
  res.redirect('http://localhost:3000/home');
})

export default router;

