import { db } from '../infra/database';

export function getUsers() {
    return db.query('select * from user_account')
}

