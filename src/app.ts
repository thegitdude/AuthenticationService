import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'

import { initFirebase } from './firebase/config'
import registerRoutes from './router/router'

// load environment variables from .env file
dotenv.config()
initFirebase()

const port = Number.parseFloat(process.env.PORT) || 3000;

const app = express();
app.use(cors())
app.use(bodyParser.json())

const router = express.Router()
registerRoutes(router)

app.use('/', router);

app.listen(port, err => {
  if (err) {
	  return console.error(err);
  }
  return console.log(`server is listening on ${port}`);
});
