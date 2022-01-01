import { db } from "../infra/database";

export const getUsers = () => db.query("select * from user_profile");

export const getUserByDomain = (domain: string, domainkey: string) => db.query(`select * from user_profile where domain = '${domain}' and domainkey = '${domainkey}'`);

export const getUsersByEmailPasswordDomain = (email: string, domainkey: string, domain: string) => db.query(`select * from user_profile where email = '${email}' and domainkey = '${domainkey}' and domain = '${domain}'`);

export const postUser = (email: string, password: string, domain: string, domainkey: string) => db.query(`INSERT INTO user_profile (email, password, domain, domainkey) VALUES ( '${email}', '${password}', '${domain}', '${domainkey}')`);

export const deleteUser = (email: string, domain: string, domainkey: string) => db.query(`DELETE FROM user_profile WHERE email= '${email}' AND domain = '${domain}' AND domainkey = '${domainkey}'`);   
