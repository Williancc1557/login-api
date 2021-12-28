
import * as express from 'express';
import { router } from './routes/userRoute';

export const app = express();



app.use('', router)
