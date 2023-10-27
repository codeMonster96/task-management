// Import necessary modules
import { Router } from 'express';
import { TaskService } from '../service/TaskService';
import { checkUserPermission } from '../utils/middleware';

// Create an instance of TaskController
const taskController = new TaskService();

// Create a router
export const taskRouter = Router();
taskRouter.use(checkUserPermission);


// Define routes
taskRouter.get('/tasks/:userId',checkUserPermission(['Admin, User']), taskController.getAllTasks);
taskRouter.get('/tasks/:id', checkUserPermission(['Admin, User']), taskController.getTaskById);
taskRouter.post('/tasks/:userId', checkUserPermission(['Admin, User']), taskController.createTask);
taskRouter.put('/tasks/:id', checkUserPermission(['Admin, User']), taskController.updateTask);
taskRouter.delete('/tasks/:id', checkUserPermission(['Admin, User']), taskController.deleteTask);

// Export the router
module.exports = taskRouter;
