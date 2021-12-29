import rateLimit from "express-rate-limit";
import * as express from 'express'
import { app } from "../app";
import * as cors from 'cors';
import {request, response} from '../types/routesTypes'

export const rateLimitServer = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message:
    "Muitas requisições foram solicitadas nesse IP, por favor, aguarde 15 minutos",
});


export const corsConfig = (req: request, res: response, next: any) => {
  //Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
  res.header("Access-Control-Allow-Origin", "*");
  //Quais são os métodos que a conexão pode realizar na API
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  app.use(cors());
  next();
}