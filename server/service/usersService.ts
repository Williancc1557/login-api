import { response } from "express"
import { getUsers, getUsersByEmailPassword, postUser, deleteUser } from "../data/usersData" 
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv'; 
dotenv.config()

const getUsersService = async () => getUsers()

const getUsersByEmailPasswordService = async (email: string, password: string) => {
    if ((await getUsersByEmailPassword(email, password)).rowCount === 0) {
        return {
            value: false,
            error: "account not found"
        }

    } else {

        const tokenAccount = jwt.sign({ email }, String(process.env.TOKEN_PRIVATE_KEY),
            {
                expiresIn: 60 * 60,
            })
        
        return {
            user: (await getUsersByEmailPassword(email, password)).rows[0],
            token: tokenAccount
        }
    }
    
}


const postUserService = async (email: string, password: string) => {
    if (email.length >= 30 || password.length < 8 || password.length >= 30) return {value: false, error: "Unable to complete registration"}
    else {
        return postUser(email, password)
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


export { getUsersService, getUsersByEmailPasswordService, postUserService, deleteUserService, verifyAuth }