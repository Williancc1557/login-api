import { response } from "express"
import { getUsers, getUsersByEmailPassword, postUser, deleteUser } from "../data/usersData" 
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv'; 
dotenv.config()

function getUsersService() {
    return getUsers()
}

async function getUsersByEmailPasswordService(email: string, password: string) {
    const tokenAccount = jwt.sign({ email }, String(process.env.TOKEN_PRIVATE_KEY),
        {
            expiresIn: 60 * 60,
        })
    if ((await getUsersByEmailPassword(email, password)).rowCount === 0) {
        return false
    } else {
        return {
            user: (await getUsersByEmailPassword(email, password)).rows,
            token: tokenAccount
        }
    }
    
}

async function postUserService(email: string, password: string) {
    if (email.length >= 30 || password.length < 8 || password.length >= 30) {
        return 'Unable to complete registration'
    } else {
        return postUser(email, password)
    }
}

async function verifyAuth(token: string) {
    try {
        jwt.verify(token, String(process.env.TOKEN_PRIVATE_KEY))
        return true
    } catch {
        return false
    }
    
}

async function deleteUserService(email: string, password: string) {
    return deleteUser(email, password)
}

export { getUsersService, getUsersByEmailPasswordService, postUserService, deleteUserService, verifyAuth }