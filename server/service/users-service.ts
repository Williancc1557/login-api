//import { getUsers, getUsersByEmailPasswordDomain, postUser, deleteUser } from "../data/users-data";
import * as jwt from "jsonwebtoken";
import { isEmail } from "@techmmunity/utils";
import * as dotenv from "dotenv";

import UserData from '../data/users-data'

const user = new UserData()

dotenv.config();

const getUsersService = async () => user.get();

const getUsersByEmailPasswordDomainService = async (email: string, domainkey: string, domain: string) => {
    const getuser = await user.getByEmailPasswordDomain(
        {
            email: email,
            domainkey: domainkey,
            domain: domain
        });
    const ivalidAccountNumber = 0;
    const selectRow = 0;

    if (getuser.rowCount === ivalidAccountNumber) return { value: false, error: "account not found" };

    return (getuser).rows[selectRow];
};


const postUserService = async (email: string, password: string, domain: string, domainkey: string) => {
    const checkEmail = isEmail(email);

    try {
        const requestUserDomain = await user.getByEmailPasswordDomain(
            {
                email: email,
                domainkey: domainkey,
                domain: domain
            });
        const rowsRequest = 0;
        const numberUserByDomain = 1;

        if (requestUserDomain.rows[rowsRequest].domainkey != domainkey) return { value: false, error: "already have an domain with this name" };
        if (!checkEmail) return { value: false, error: "unable to complete registration" };
        if (requestUserDomain.rowCount >= numberUserByDomain) return { value: false, error: "already have an account with this email" };
    } catch {
        await user.post({
                email: email, 
                password: password, 
                domain: domain, 
                domainkey: domainkey
            });
        return true;
    }
};

const createToken = async (email: string) => {
    const tokenAccount = jwt.sign(
        { email },
        String(process.env.TOKEN_PRIVATE_KEY),
        {
            expiresIn: "5h",
        }
    );
    return tokenAccount;
};

const verifyAuth = async (token: string) => {
    try {
        jwt.verify(token, String(process.env.TOKEN_PRIVATE_KEY));
        return true;
    } catch {
        return false;
    }
};


const deleteUserService = async (email: string, domain: string, domainkey: string) => {
    const result = await user.delete({
        email: email, 
        domain: domain, 
        domainkey: domainkey
    });
    const rowCountSend = result.rowCount;
    const rowCountFalse = 0;
    if (rowCountSend == rowCountFalse) return false;
    return true;
};


export { getUsersService, getUsersByEmailPasswordDomainService, postUserService, deleteUserService, verifyAuth, createToken };