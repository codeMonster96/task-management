import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Permission } from "./Permission";

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(type => User, user => user.roles)
  users: User[];

  @ManyToMany(type => Permission, permission => permission.roles)
  @JoinTable()
  permissions: Permission[];
}