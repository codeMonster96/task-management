import { AppDataSource } from "./data-source"
import * as express from "express"
import { taskRouter }  from './controller/TaskController';
import userRouter from './controller/UserController';
const dotenv = require('dotenv');
dotenv.config();


AppDataSource.initialize().then(async () => {
        const app = express()
        app.use(express.json())
        
        app.use('/user', userRouter);
        // app.use('/task', taskRouter);

        const PORT = process.env.PORT
        console.log("process.env.PORT : ", __dirname);

        app.listen(PORT, () => {
        console.log("server running at port ", PORT);
    })
}).catch(error => console.log(error))
