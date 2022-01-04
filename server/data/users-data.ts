import { db } from "../infra/database";
import { UserDataType } from "../types/routes-types";


export default class UserData {

    public get = () => {
        return db.query("select * from user_profile");
    };

    public getByDomain = ({ domain, domainkey }: UserDataType) => db.query(`select * from user_profile where domain = '${domain}' and domainkey = '${domainkey}'`);


    public getByEmailPasswordDomain = ({ email, domainkey, domain }: UserDataType) => db.query(`select * from user_profile where email = '${email}' and domainkey = '${domainkey}' and domain = '${domain}'`);


    public updateUser = ({ email, domainkey, domain, newemail, newpassword }: UserDataType) => {
        if (newemail && newpassword) return db.query(`UPDATE user_profile SET email = '${newemail}', password = '${newpassword}' WHERE email = '${email}' and domain = '${domain}' and domainkey = '${domainkey}'`);
        else if (newemail) return db.query(`UPDATE user_profile SET email = '${newemail}' WHERE email = '${email}' and domain = '${domain}' and domainkey = '${domainkey}'`);
        else if (newpassword) return db.query(`UPDATE user_profile SET password = '${newpassword}' WHERE email = '${email}' and domain = '${domain}' and domainkey = '${domainkey}'`);
        else return false;
    };

    public post = ({ email, password, domain, domainkey }: UserDataType) => db.query(`INSERT INTO user_profile (email, password, domain, domainkey) VALUES ( '${email}', '${password}', '${domain}', '${domainkey}')`);


    public delete = ({ email, domain, domainkey }: UserDataType) => db.query(`DELETE FROM user_profile WHERE email= '${email}' AND domain = '${domain}' AND domainkey = '${domainkey}'`);
}
