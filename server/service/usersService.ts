import { response } from "express"
import { getUsers, getUsersByEmail, postUser, deleteUser } from "../data/usersData" 

function getUsersService() {
    return getUsers()
}

function getUsersByEmailService(email: string) {
    return getUsersByEmail(email)
}

function postUserService(email: string, password: string) {
    if (email.length >= 30 || password.length < 8 || password.length >= 30) {
        return 'Unable to complete registration'
    } else {
        return postUser(email, password)
    }
}


function deleteUserService(email: string, password: string) {
    return deleteUser(email, password)
}

export { getUsersService, getUsersByEmailService, postUserService, deleteUserService }