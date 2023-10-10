import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';
import * as routes from '../routes/index.js'

const app = express();
app.use(cors({
  origin: '*'
}));
app.use(bodyParser.json());
// use passport session
//app.use(passport.initialize());
//app.use(passport.session());
app.use(routes.default);
export default app;
