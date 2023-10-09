import * as React from 'react';
import Title from "./Title";
import { Button, TextField } from '@mui/material'
import { useState } from 'react';
import axios from 'axios';

export default function TicketForm() {
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = async(event) => {
    const body = {
      email,
      firstName,
      lastName,
      title,
      description
    }
    await axios.post('https://ticket-system-production.up.railway.app/tickets', body);
  }
  return(
    <React.Fragment>
      <Title>Create new ticket</Title>
      <form onSubmit={handleSubmit}>
        <TextField 
          id="first-name" 
          type='text' 
          label="First name" 
          fullWidth 
          variant="outlined" 
          required
          sx={{mb:2}}
          onChange={e => setFirstName(e.target.value)}
        />
        <TextField 
          id="lat-name" 
          type='text' 
          label="Last name" 
          fullWidth 
          variant="outlined" 
          required
          sx={{mb:2}}
          onChange={e => setLastName(e.target.value)}
        />
        <TextField 
          id="email" 
          type='email' 
          label="Email" 
          fullWidth 
          variant="outlined" 
          required 
          sx={{mb:2}}
          onChange={e => setEmail(e.target.value)}
        />
        <TextField 
          id="title" 
          type='text' 
          label="Title" 
          fullWidth 
          variant="outlined" 
          required 
          sx={{mb:2}}
          onChange={e => setTitle(e.target.value)}
        />
        <TextField 
          id="description" 
          type='text' 
          label="Description" 
          fullWidth 
          variant="outlined" 
          required
          sx={{mb:2}}
          onChange={e => setDescription(e.target.value)}
        />
        <Button variant="outlined" type="submit">Submit</Button>
      </form>
    </React.Fragment>
  )
}