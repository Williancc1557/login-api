import * as express from "express";
import { response, request } from "../types/routes-types";
import {
    getUsersByEmailPasswordDomainService,
    postUserService,
    deleteUserService,
    verifyAuth,
    createToken,
} from "../service/users-service";

const router = express.Router();

router.post("/users/get", async (req: request, res: response) => {
    const email = req.body.email;
    const domain = req.body.domain;
    const domainkey = req.body.domain;
    const userByEmailPassword = await getUsersByEmailPasswordDomainService(
        email,
        domainkey,
        domain,
    );
    res.json(userByEmailPassword);
});

router.post("/createtoken", async (req: request, res: response) => {
    const email = req.params.email;

    const token = await createToken(email);
    res.send(token);
});

router.get("/verifyauth/:token", async (req: request, res: response) => {
    const tokenInput = req.params.token;
    res.send(await verifyAuth(tokenInput));
});

router.post("/users", async (req: request, res: response) => {
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
});

router.delete(
    "/deleteuser/:email/:senha",
    async (req: request, res: response) => {
        const deleted = await deleteUserService(req.params.email, req.params.senha);
        res.send(deleted);
    },
);

export { router };
