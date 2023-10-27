import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Task } from "./entity/Task"
import { Permission } from "./entity/Permission"
import { Role } from "./entity/Roles"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "yourname",
    password: "yourpassword",
    database: "postgres",
    synchronize: true,
    logging: false,
    entities: [User, Task, Role, Permission],
    migrations: [],
    subscribers: [],
})
