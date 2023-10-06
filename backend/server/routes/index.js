import { Router } from 'express';
import ticketsRoutes from './tickets.js';
import usersRoutes from './users.js';
import passport from 'passport';

const routes = Router();

routes.use('/tickets', ticketsRoutes);
routes.use('/users', usersRoutes);

export default routes