import { getRepository } from "typeorm";
import { User } from "../entity/User";
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

export const checkUserPermission = (req, res, next) => {
    // try {
    //   const token = req.headers.authorization.split(' ')[1];
    //   if(token) {
    //     const decoded = jwt.verify(token, process.env.SECRET_KEY);
    //     const userRepository = getRepository(User);
    //     const user = userRepository.findOne(decoded.id).then(data => {
    //       const hasRequiredRole = data.roles.find(role => permissionName.includes(role.name));
    //       if (hasRequiredRole) {
    //         next();
    //       } else {
    //         res.status(403).send('Access forbidden');
    //       }
    //     })
    //   }
    // } catch (error) {
    //   console.error('Error checking user role:', error);
    //   res.status(500).send('Internal Server Error');
    // }
  };
  