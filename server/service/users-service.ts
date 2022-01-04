//import { getUsers, getUsersByEmailPasswordDomain, postUser, deleteUser } from "../data/users-data";
import * as jwt from "jsonwebtoken";
import { isEmail } from "@techmmunity/utils";
import * as dotenv from "dotenv";
import UserData from "../data/users-data";
import { UserDataType } from "../types/routes-types";

const user = new UserData();

dotenv.config();

export const getUsersService = async () => user.get();

export const getUsersByEmailPasswordDomainService = async (email: string, domainkey: string, domain: string) => {
    const getuser = await user.getByEmailPasswordDomain(
        {
            email: email,
            domainkey: domainkey,
            domain: domain,
        });
    const ivalidAccountNumber = 0;
    const selectRow = 0;

    if (getuser.rowCount === ivalidAccountNumber) return { value: false, error: "account not found" };

    return (getuser).rows[selectRow];
};



export const postUserService = async (email: string, password: string, domain: string, domainkey: string) => {
    const checkEmail = isEmail(email);

    try {
        const requestUserDomain = await user.getByEmailPasswordDomain(
            {
                email: email,
                domainkey: domainkey,
                domain: domain,
            });
        const checkDomain = await user.getByDomain({
            domainkey: domainkey,
            domain: domain,
        });
        const rowsRequest = 0;
        const numberUserByDomain = 1;



        if (checkDomain.rows[rowsRequest].domainkey != domainkey) return { value: false, error: "Domain password invalid!" };
        if (!checkEmail) return { value: false, error: "unable to complete registration" };
        if (requestUserDomain.rowCount >= numberUserByDomain) return { value: false, error: "already have an account with this email" };

        await user.post({
            email: email,
            password: password,
            domain: domain,
            domainkey: domainkey,
        });
        return true;
    } catch {
        await user.post({
            email: email,
            password: password,
            domain: domain,
            domainkey: domainkey,
        });
        return true;
    }
};

export const createToken = async (email: string) => {
    const tokenAccount = jwt.sign(
        { email },
        String(process.env.TOKEN_PRIVATE_KEY),
        {
            expiresIn: "5h",
        }
    );
    return tokenAccount;
};

export const verifyAuth = async (token: string) => {
    try {
        jwt.verify(token, String(process.env.TOKEN_PRIVATE_KEY));
        return true;
    } catch {
        return false;
    }
};


export const updateUser = async ({ email, domainkey, domain, newemail, newpassword }: UserDataType) => {
    const result = user.updateUser({
        email: email,
        domainkey: domainkey,
        domain: domain,
        newemail: newemail,
        newpassword: newpassword,
    });

    const testSend = result != false ? true : false;
    return testSend;
};

export const deleteUserService = async (email: string, domain: string, domainkey: string) => {
    const result = await user.delete({
        email: email,
        domain: domain,
        domainkey: domainkey,
    });
    const rowCountSend = result.rowCount;
    const rowCountFalse = 0;
    const sendReturn = rowCountSend == rowCountFalse ? false : true;
    console.log(sendReturn);
    return sendReturn;
};