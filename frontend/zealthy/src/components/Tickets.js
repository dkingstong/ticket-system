//this component will make an api request to get the tickets if the user is an admin
// after that is going to save them in state
// then we are going to build the table
// our status is going to be an input with options
// when the input changes we need to make an api call to save the ticket with that ID

import * as React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Tickets() {

  const [tickets, setTickets] = useState([])
  const [open, setOpen] = useState(false);
  const [currentTicket, setCurrentTicket] = useState(null)
  const handleOpen = (id) => {
    for(const ticket of tickets) {
      if(id === ticket.id) {
        setCurrentTicket(ticket);
      }
    }
    setOpen(true);
  }
  const handleClose = () => {
    setCurrentTicket(null)
    setOpen(false);
  }

  useEffect(() => {getTickets()}, [])

  const getTickets = async () => {
    const res = await axios.get('https://ticket-system-production.up.railway.app/tickets/index')
    const { tickets } = res.data
    setTickets([...tickets])
  }

  const handleChange = async (event) => {
    await axios.put(`https://ticket-system-production.up.railway.app/tickets/${currentTicket.id}`, {status: event.target.value})
    window.location.reload(false);
  }

  return (
    <React.Fragment>
      <Title>Tickets</Title>
      <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Date</TableCell>
          <TableCell align='left'>Title</TableCell>
          <TableCell>User</TableCell>
          <TableCell align='right'>Status</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {tickets.map((row) => (
          <TableRow hover onClick={() => handleOpen(row.id)} key={row.id}>
            <TableCell>{row.date}</TableCell>
            <TableCell>{row.title}</TableCell>
            <TableCell>{row.name}</TableCell>
            <TableCell align='right'>{row.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            {currentTicket && currentTicket.title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {currentTicket && currentTicket.description}
          </Typography>
          <FormControl variant="standard" sx={{ mt: 5, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">Ticket status</InputLabel>
            <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={currentTicket && currentTicket.status}
            onChange={handleChange}
          >
              <MenuItem value={'NEW'}>New</MenuItem>
              <MenuItem value={'IN_PROGRESS'}>In progress</MenuItem>
              <MenuItem value={'RESOLVED'}>Resolved</MenuItem>
            </Select>
            <Button onClick={() => console.log('Send email')} sx={{ mt: 5, }}>Respond</Button>
          </FormControl>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
