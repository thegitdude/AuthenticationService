import express from 'express'
import bodyParser from 'body-parser'
import { initFirebase } from './firebase/config'
import registerRoutes from './router/router'

initFirebase()

const port = 3000;
const app = express();
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
