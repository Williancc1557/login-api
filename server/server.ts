import * as express from 'express';
import { app } from './app'

const PORTA = process.env.PORT || 3000


app.listen(PORTA)