import { db } from '../infra/database';

export function getUsers() {
    return db.query('select * from user_account')
}

export function getUsersByEmailPassword(email: string, password: string) {
    return db.query(`select * from user_account where email = '${email}' and password = '${password}'`)
}

export function postUser(email: string, password: string) {
    return db.query(`INSERT INTO user_account (email, password) VALUES ( '${email}', '${password}')`)
}

export function deleteUser(email: string, password: string) {
    return db.query(`DELETE FROM user_account WHERE email= '${email}' AND password = '${password}'`)
}