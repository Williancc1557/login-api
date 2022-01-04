import { Request, Response } from "express";
export interface UserDataType {
    nome?: string;
    domainkey: string;
    domain: string;
    email?: string;
    password?: string;
    newemail?: string;
    newpassword?: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export type request = Request;
// eslint-disable-next-line @typescript-eslint/naming-convention
export type response = Response;