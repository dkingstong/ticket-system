import express from 'express'
import * as TicketController from '../controllers/ticketController'

const router = express.Router()

router.post('/', async(req, res) => {
  const ticket = req.body;
  const newTicket = await TicketController.createTicket(ticket)
  return res.status(200).json({ newTicket })
  
})

router.put('/:id', async (req,res) => {
  const ticketId = req.params.id
  const updates = req.body
  const updatedTicket = await TicketController.updateTicket(ticketId, updates)
  // Maybe send an email here to let the user know the status of a ticket
  res.status(200).json({ ticket: updatedTicket })
})

router.get('/index', async (req,res) => {
  // todo: we could implement some pagination here
  const tickets = await TicketController.showTickets()
  res.status(200).json({ tickets })
})


export default router;