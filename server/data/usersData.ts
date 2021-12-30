import { db } from '../infra/database';

export const getUsers = () => db.query('select * from user_account')

export const getUsersByEmailPassword = (email: string, password: string) => db.query(`select * from user_account where email = '${email}' and password = '${password}'`)

export const postUser = (email: string, password: string) => db.query(`INSERT INTO user_account (email, password) VALUES ( '${email}', '${password}')`)

export const deleteUser = (email: string, password: string) => db.query(`DELETE FROM user_account WHERE email= '${email}' AND password = '${password}'`)   
