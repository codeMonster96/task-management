// Import necessary modules
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';
import { Role } from '../entity/Roles';
import { Permission } from '../entity/Permission';
import { jwt } from 'jsonwebtoken';
import { config } from 'dotenv'

// Define the UserController class
export class UserService {
    
    userLogin = async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const userRepository = getRepository(User);
            const user = await userRepository.findOne(email);
            if (user) {
                if(user.password === password) {
                    const token = jwt.sign({ userId: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email }, process.env.secret_key, { expiresIn: '1h' });
                    res.json({ token });
                } else {
                    res.status(401).json({ message: 'Invalid credentials' });
                }
            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
    }

    // Get all users
    getAllUsers = async (req: Request, res: Response) => {
        const userRepository = getRepository(User);
        try {
            const users = await userRepository.find();
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    };

    // Get user by ID
    getUserById = async (req: Request, res: Response) => {
        const { id } = req.params;
        const userRepository = getRepository(User);
        try {
            const user = await userRepository.findOne({where: {id: Number(id)}});

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.json(user);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    };

    // Create a new user
    createUser = async (req: Request, res: Response) => {
        const { firstName, lastName, email, password } = req.body;
        const userRepository = getRepository(User);
        const adminRole = new Role();
        adminRole.name = 'Admin'; 
        const userRole = new Role();
        userRole.name = 'User';
        const readPermission = new Permission();
        readPermission.name = 'Read';
        const writePermission = new Permission();
        writePermission.name = 'Write';
        adminRole.permissions = [readPermission, writePermission];
        userRole.permissions = [readPermission];
        const newUser = userRepository.create({
            firstName,
            lastName,
            email,
            password,
            roles: [adminRole, userRole],
            createdAt: new Date(),
            updatedAt: new Date()
        });

        try {
            await userRepository.save(newUser);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    };

    // Update user by ID
    updateUser = async (req: Request, res: Response) => {
        const { id } = req.params;
        const userRepository = getRepository(User);
        try {
            const user = await userRepository.findOne({where: {id: Number(id)}});
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            
            await userRepository.save({ ...user, ...req.body });
            res.json({ ...user, ...req.body });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    };

    // Delete user by ID
    deleteUser = async (req: Request, res: Response) => {
        const { id } = req.params;
        const userRepository = getRepository(User);
        try {
            const user = await userRepository.findOne({where: {id: Number(id)}});
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            await userRepository.remove(user);
            res.json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    };
}
