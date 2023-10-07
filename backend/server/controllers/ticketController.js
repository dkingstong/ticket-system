import { getModels } from '../models/index'

export const createTicket = async (ticket) => {
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
  const newTicket = await Tickets.create({
    userId: user && user.id,
    description: ticket.description,
    title: ticket.title,
    status: 'NEW'
  })
  return newTicket;
}

export const updateTicket = async (ticketId, updates) => {
  const { Tickets } = getModels()
  const updatedTicket = await Tickets.update(updates, {
    where: {
      id: ticketId
    }
  })
  return updatedTicket
}

export const showTickets = async () => {
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
  return responseTickets;
}