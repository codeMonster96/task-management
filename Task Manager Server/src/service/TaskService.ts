import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Task } from '../entity/Task';
import { User } from '../entity/User';

export class TaskService {
    getAllTasks = async (req: Request, res: Response) => {
        const { userId } = req.params;
        const userRepository = getRepository(User);
        try {
            const tasks = await userRepository.findOne({where: {id: Number(userId)}});
            res.json(tasks.tasks);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    };

    getTaskById = async (req: Request, res: Response) => {
        const { id } = req.params;
        const taskRepository = getRepository(Task);

        try {
            const task = await taskRepository.findOne({where: {id: Number(id)}});
            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }
            res.json(task);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    };

    createTask = async (req: Request, res: Response) => {
        const { title, description, status, priority } = req.body;
        const taskRepository = getRepository(Task);
        const userRepository = getRepository(User);

        const user = await userRepository.findOne({where: {id: Number(req.params.id)}});
        const newTask = taskRepository.create({
            title,
            description,
            status,
            priority,
            createdAt: new Date(),
            updatedAt: new Date(),
            user,
        });
        try {
            await taskRepository.save(newTask);
            res.status(201).json(newTask);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    };

    updateTask = async (req: Request, res: Response) => {
        const { id } = req.params;
        const taskRepository = getRepository(Task);
        try {
            const task = await taskRepository.findOne({where: {id: Number(id)}});
            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }
            await taskRepository.save({...task, ...req.body});
            res.json({...task, ...req.body});
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    };

    // Delete task by ID
    deleteTask = async (req: Request, res: Response) => {
        const { id } = req.params;
        const taskRepository = getRepository(Task);
        try {
            const task = await taskRepository.findOne({where: {id: Number(id)}});
            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }
            await taskRepository.remove(task);
            res.json({ message: 'Task deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    };
}
