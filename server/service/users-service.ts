import { getUsers, getUsersByEmailPasswordDomain, postUser, deleteUser } from "../data/users-data";
import * as jwt from "jsonwebtoken";
import { isEmail } from "@techmmunity/utils";
import * as dotenv from "dotenv";
dotenv.config();

const getUsersService = async () => getUsers();

const getUsersByEmailPasswordDomainService = async (email: string, domainkey: string, domain: string) => {
    console.log(email, domain, domainkey);
    const getuser = await getUsersByEmailPasswordDomain(email, domainkey, domain);
    console.log(getuser);
    const ivalidAccountNumber = 0;
    const selectRow = 0;

    if (getuser.rowCount === ivalidAccountNumber) return { value: false, error: "account not found" };

    return (getuser).rows[selectRow];
};


const postUserService = async (email: string, password: string, domain: string, domainkey: string) => {
    const checkEmail = isEmail(email);

    try {
        const requestUserDomain = await getUsersByEmailPasswordDomain(email, domainkey, domain);
        const rowsRequest = 0;
        const numberUserByDomain = 1;

        if (requestUserDomain.rows[rowsRequest].domainkey != domainkey) return { value: false, error: "already have an domain with this name" };
        if (!checkEmail) return { value: false, error: "unable to complete registration" };
        if (requestUserDomain.rowCount >= numberUserByDomain) return { value: false, error: "already have an account with this email" };
    } catch {
        await postUser(email, password, domain, domainkey);
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
    const result = await deleteUser(email, domain, domainkey);
    const rowCountSend = result.rowCount;
    const rowCountFalse = 0;
    if (rowCountSend == rowCountFalse) return false;
    return true;
};


export { getUsersService, getUsersByEmailPasswordDomainService, postUserService, deleteUserService, verifyAuth, createToken };