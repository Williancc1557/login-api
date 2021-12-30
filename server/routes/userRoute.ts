import * as express from 'express';
import { response, request } from '../types/routesTypes';
import { getUsersByEmailPasswordService, postUserService, deleteUserService, verifyAuth } from '../service/usersService';


const router = express.Router() 

router.get('/users/:email/:password', async (req: request, res: response, next) => {
    const userByEmailPassword = await getUsersByEmailPasswordService(req.params.email, req.params.password);
    res.json(userByEmailPassword);
});

router.get('/verifyauth/:token', async (req: request, res: response) => {
    const tokenInput = req.params.token
    res.send(await verifyAuth(tokenInput))
})

router.post('/users', async (req: request, res: response, next) => {
    const emailData = req.body.email;
    const passwordData = req.body.password;
    try {
        const sendUser = await postUserService(emailData, passwordData)
        res.send(sendUser)
    } catch {
        res.json({
            value: false,
            error: "already have an account with this email"
        })
    }
});

router.delete('/deleteuser/:email/:senha', async (req: request, res: response) => {
    const deleted = await deleteUserService(req.params.email, req.params.senha);
    res.send(deleted)
});

export { router }