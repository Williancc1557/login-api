import { response } from "express"
import { getUsers, getUsersByEmailPasswordDomain, postUser, deleteUser, getUserByDomain } from "../data/usersData" 
import * as jwt from 'jsonwebtoken';
import { isEmail } from '@techmmunity/utils';
import * as dotenv from 'dotenv'; 
dotenv.config()

const getUsersService = async () => getUsers()

const getUsersByEmailPasswordDomainService = async (email: string, domainkey: string, domain: string) => {
    const getuser = await getUsersByEmailPasswordDomain(email, domainkey, domain)

    if (getuser.rowCount === 0) return { value: false,error: "account not found"} 

    const tokenAccount = jwt.sign(
        { email },
        String(process.env.TOKEN_PRIVATE_KEY),
        {
            expiresIn: '5h',
        }
    )

    return {
        user: (getuser).rows[0],
        token: tokenAccount
    }   
}


const postUserService = async (email: string, password: string, domain: string, domainkey: string) => {
    const checkEmail = isEmail(email)
    
    try {
        const requestUserDomain = await getUsersByEmailPasswordDomain(email, password, domain)
        console.log(requestUserDomain)
        if (requestUserDomain.rows[0].domainkey != domainkey) return { value: false, error: "already have an domain with this name" }
        if (checkEmail == false) return { value: false, error: "unable to complete registration" }
        if (requestUserDomain.rowCount >= 1) return { value: false, error: "already have an account with this email" }
    } catch {
        const request = postUser(email, password, domain, domainkey)
        return await request
    }
}


const verifyAuth = async (token: string) => {
    try {
        jwt.verify(token, String(process.env.TOKEN_PRIVATE_KEY))
        return true
    } catch {
        return false
    }
}


const deleteUserService = async (email: string, password: string) => {
    return deleteUser(email, password)
}


export { getUsersService, getUsersByEmailPasswordDomainService, postUserService, deleteUserService, verifyAuth }