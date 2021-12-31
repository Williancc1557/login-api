import * as express from 'express';
import { response, request } from '../types/routesTypes';
import { getUsersByEmailPasswordDomainService, postUserService, deleteUserService, verifyAuth, createToken } from '../service/usersService';
import { isEmail } from '@techmmunity/utils'

const router = express.Router() 

router.get('/users/:email/:domain/:domainkey', async (req: request, res: response, next) => {
    const userByEmailPassword = await getUsersByEmailPasswordDomainService(req.params.email, req.params.domainkey, req.params.domain);
    res.json(userByEmailPassword);
});

router.post('/createtoken', async (req: request, res: response) => {
    const email = req.params.email
    const password = req.params.password
    const domain = req.body.domain

    const token = await createToken(email, password)
    res.send(token)
})

router.get('/verifyauth/:token', async (req: request, res: response) => {
    const tokenInput = req.params.token
    res.send(await verifyAuth(tokenInput))
})

router.post('/users', async (req: request, res: response, next) => {
    const emailData = req.body.email;
    const passwordData = req.body.password;
    const domainData = req.body.domain;
    const domainKeyData = req.body.domainkey;

    const data = await postUserService(emailData, passwordData, domainData, domainKeyData)
    res.json(data)
});

router.delete('/deleteuser/:email/:senha', async (req: request, res: response) => {
    const deleted = await deleteUserService(req.params.email, req.params.senha);
    res.send(deleted)
});

export { router }