import { createToken, deleteUserService, getUsersByEmailPasswordDomainService, postUserService, verifyAuth } from "../service/users-service";
import { request, response } from "../types/routes-types";

export class RoutesController {

    public async routePostUserGet(req: request, res: response): Promise<response> {
        const email = req.body.email;
        const domain = req.body.domain;
        const domainkey = req.body.domainkey;
        const userByEmailPassword = await getUsersByEmailPasswordDomainService(
            email,
            domainkey,
            domain,
        );

        return res.json(userByEmailPassword);
    }


    public async routerPostCrateToken(req: request, res: response): Promise<response> {
        const email = req.params.email;
        const token = await createToken(email);

        return res.send(token);
    }


    public async routerVerifyAuth(req: request, res: response): Promise<response> {
        const tokenInput = req.params.token;
        const result = await verifyAuth(tokenInput);

        return res.send(result);
    }


    public async routerPostUser(req: request, res: response): Promise<response> {
        const emailData = req.body.email;
        const passwordData = req.body.password;
        const domainData = req.body.domain;
        const domainKeyData = req.body.domainkey;
        const data = await postUserService(
            emailData,
            passwordData,
            domainData,
            domainKeyData,
        );

        return res.json(data);
    }


    public async routerDeleteUser(req: request, res: response): Promise<response> {
        const emailData = req.body.email;
        const domainData = req.body.domain;
        const domainKeyData = req.body.domainkey;
        const deleted = await deleteUserService(emailData, domainData, domainKeyData);

        return res.send(deleted);
    }
}

