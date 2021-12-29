import * as express from 'express';
import { response, request } from '../types/routesTypes';
import { getUsersService, getUsersByEmailService, postUserService, deleteUserService } from '../service/usersService';


const router = express.Router() 


router.get('/users', async (req: request, res: response) => {
    const users = await getUsersService();
    res.json(users.rows);
});

router.get('/users/:email', async (req: request, res: response) => {
    const userByEmail = await getUsersByEmailService(req.params.email);
    res.json(userByEmail);
});

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
    const deleted = await deleteUserService(req.params.email, req.params.senha);
    res.send(deleted)
});

export { router }