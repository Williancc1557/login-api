import { createToken, deleteUserService, getUsersByEmailPasswordDomainService, postUserService, verifyAuth } from "../service/users-service";
import { request, response } from "../types/routes-types";

export class RoutesController {

    public async routeUserGet(req: request, res: response) {
        const email = req.body.email;
        const domain = req.body.domain;
        const domainkey = req.body.domain;
        const userByEmailPassword = await getUsersByEmailPasswordDomainService(
            email,
            domainkey,
            domain,
        );
        res.json(userByEmailPassword);
    }


    public async routerPostCrateToken(req: request, res: response) {
        const email = req.params.email;

        const token = await createToken(email);
        res.send(token);
    }


    public async routerVerifyAuth(req: request, res: response) {
        const tokenInput = req.params.token;
        res.send(await verifyAuth(tokenInput));
    }


    public async routerPostUser(req: request, res: response) {
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
        res.json(data);
    }


    public async routerDeleteUser(req: request, res: response) {
        const deleted = await deleteUserService(req.params.email, req.params.senha);
        res.send(deleted);
    }
}

