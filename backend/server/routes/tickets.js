import express from 'express'
import { getModels } from '../models/index'

const router = express.Router()

router.post('/', async(req, res) => {
  const ticket = req.body;
  const user = req.headers.user
  if(user !== 'admin') {
    const { Tickets, Users } = getModels()
    let user = await Users.findOne({ where: { email: ticket.email } })
    if(!user) {
      const newUser = {
        firstName: ticket.firstName,
        lastName: ticket.lastName,
        email: ticket.email,
        hashedPassword: '123456789',
        role: 'user'
      }
      user = await Users.create(newUser)
    }
    await Tickets.create({
      userId: user && user.id,
      description: ticket.description,
      title: ticket.title,
      status: 'NEW'
    })
    return res.status(200)
  }
  return res.status(401).send('user is not authorized')
})

router.put('/:id', async (req,res) => {
  const ticketId = req.params.id
  const updates = req.body
  const { Tickets } = getModels()
  const updatedTicket = await Tickets.update(updates, {
    where: {
      id: ticketId
    }
  })
  // Maybe send an email here to let the user know the status of a ticket
  res.status(200).json({ ticket: updatedTicket })
})

router.get('/index', async (req,res) => {
  // todo: we could implement some pagination here
  const { Tickets, Users } = getModels()
  const tickets = await Tickets.findAll({ include: Users })
  const responseTickets = tickets.map(ticket => {
    return {
      id: ticket.id,
      name: ticket.User.firstName + ' ' + ticket.User.lastName,
      email: ticket.User.email,
      title: ticket.title,
      status: ticket.status,
      description: ticket.description,
      date: ticket.createdAt
    }
  })
  res.status(200).json({ tickets: responseTickets })
})


export default router;