import { db } from "../infra/database";

type UserDataType = {
    nome?: string
    domainkey: string
    domain: string
    email?: string
    password?: string
}

export default class UserData {

    constructor() {
    }

    get() {
        return db.query("select * from user_profile");
    }

    getByDomain({ domain, domainkey }: UserDataType) {
        return db.query(`select * from user_profile where domain = '${domain}' and domainkey = '${domainkey}'`);
    }

    getByEmailPasswordDomain({ email, domainkey, domain }: UserDataType) {
        return db.query(`select * from user_profile where email = '${email}' and domainkey = '${domainkey}' and domain = '${domain}'`);
    }

    post({ email, password, domain, domainkey }: UserDataType) {
        return db.query(`INSERT INTO user_profile (email, password, domain, domainkey) VALUES ( '${email}', '${password}', '${domain}', '${domainkey}')`);
    }

    delete({ email, domain, domainkey }: UserDataType) {
        return db.query(`DELETE FROM user_profile WHERE email= '${email}' AND domain = '${domain}' AND domainkey = '${domainkey}'`);
    }

}
