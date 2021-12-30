import { response } from "express"
import { getUsers, getUsersByEmailPassword, postUser, deleteUser } from "../data/usersData" 
import * as jwt from 'jsonwebtoken';
import { isEmail } from '@techmmunity/utils';
import * as dotenv from 'dotenv'; 
dotenv.config()

const getUsersService = async () => getUsers()

const getUsersByEmailPasswordService = async (email: string, password: string) => {
    if ((await getUsersByEmailPassword(email, password)).rowCount === 0) {
        return {
            value: false,
            error: "account not found"
        }

    } 

    const tokenAccount = jwt.sign(
        { email },
        String(process.env.TOKEN_PRIVATE_KEY),
        {
            expiresIn: 60 * 60,
        }
    )
    
    return {
        user: (await getUsersByEmailPassword(email, password)).rows[0],
        token: tokenAccount
    }   
}


const postUserService = async (email: string, password: string) => {
    const checkEmail = isEmail(email)
    
    if (checkEmail == false) return {value: false, error: "Unable to complete registration"}
    return postUser(email, password)
    
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


export { getUsersService, getUsersByEmailPasswordService, postUserService, deleteUserService, verifyAuth }