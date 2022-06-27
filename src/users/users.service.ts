// src/users/users.service.ts

/**
 * Data Model Interfaces
 */
import { BaseUser, User } from "./user.interface";
import { Users } from "./users.interface";


/**
 * In-Memory Store
 */

let users: Users = {
  1: {
    id: 1,
    name: "Ram Shrestha",
    email: "ram.shrestha@gmail.com",
    phone: 9849787330,
    username: "ram.shrestha",
    password: "test123"
  },
  2: {
    id: 2,
    name: "Raman Shrestha",
    email: "raman.shrestha@gmail.com",
    phone: 9849787331,
    username: "raman.shrestha",
    password: "test1234"
  },
  3: {
    id: 3,
    name: "Raju Shrestha",
    email: "raju.shrestha@gmail.com",
    phone: 9849787335,
    username: "raju.shrestha",
    password: "test1123"
  }
};


/**
 * Service Methods
 */

export const findAll = async (): Promise<Users> => Object.values(users);

export const find = async (id: number): Promise<User> => users[id];

export const create = async (newUser: BaseUser): Promise<User> => {
  const id = new Date().valueOf()

  users[id] = {
    id,
    ...newUser
  };

  return users[id]
}


export const update = async (updateUser: BaseUser, id: number): Promise<User | null> => {
  const user = await find(id);

  if (!user) {
    // create(updateUser)
    return null
  }

  users[id] = { id, ...updateUser }

  return users[id]

}


export const remove = async (id: number): Promise<null | void> => {
  const user = find(id);

  if (!user) {
    return null;
  }

  delete users[id];
}