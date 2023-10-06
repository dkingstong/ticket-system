import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';
import * as routes from '../routes/index.js'

const app = express();
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000'
}));
// use passport session
//app.use(passport.initialize());
//app.use(passport.session());
app.use(routes.default);
export default app;
