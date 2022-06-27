// src/users/users.interface.ts

import { User } from "./user.interface";

export interface Users {
  [key: number]: User;
}
