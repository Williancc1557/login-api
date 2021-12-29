import * as express from 'express';
import { response, request } from '../types/routesTypes';
import { getUsersByEmailPasswordService, postUserService, deleteUserService, verifyAuth } from '../service/usersService';


const router = express.Router() 


router.get('/users/:email/:password', async (req: request, res: response) => {
    const userByEmailPassword = await getUsersByEmailPasswordService(req.params.email, req.params.password);
    res.json(userByEmailPassword);
});

router.get('/verifyauth/:token', async (req: request, res: response) => {
    const tokenInput = req.params.token
    res.send(await verifyAuth(tokenInput))
})

router.post('/users', async (req: request, res: response) => {
    const emailData = req.body.email;
    const passwordData = req.body.password;

    try {
        const sendUser = await postUserService(emailData, passwordData)
        if (sendUser === 'Unable to complete registration') {
            return res.send(sendUser)
        } else {
            return res.send('Created account whith sucess!')
        }
    } catch {
        return res.send('There is already an account with this email')
    }
});

router.delete('/deleteuser/:email/:senha', async (req: request, res: response) => {
    const deleted = deleteUserService(req.params.email, req.params.senha);
    res.send(deleted)
});



export { router }