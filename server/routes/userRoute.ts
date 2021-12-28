import * as express from 'express'
import { response, request } from '../types/routesTypes';
import { getUsersService } from '../service/usersService';


const router = express.Router() 


router.get('/users', async (req: request, res: response) => {
    const users = await getUsersService()
    res.json(users.rows)
});

router.get('/users/:email', async (req: request, res: response) => {
});

router.post('/users', async (req: request, res: response) => {
    
});
router.put('/posts/:email', async (req: request, res: response) => {
    
}); //alteração
router.delete('/posts/:id', async (req: request, res: response) => {
    
});

export { router }