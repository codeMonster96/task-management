// Import necessary modules
import { Router } from 'express';
import { UserService } from '../service/UserService';
import { checkUserPermission } from '../utils/middleware';


// Create an instance of UserController
const userController = new UserService();

// Create a router
const userRouter = Router();
userRouter.use(checkUserPermission);
// Define routes
userRouter.post('/login', userController.userLogin);
userRouter.get('/users', userController.getAllUsers);
userRouter.get('/users/:id', userController.getUserById);
userRouter.post('/user', userController.createUser);
userRouter.put('/users/:id', userController.updateUser);
userRouter.delete('/users/:id', userController.deleteUser);

// Export the router
module.exports = userRouter;
