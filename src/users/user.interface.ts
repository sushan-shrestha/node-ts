// src/users/user.interface.ts


export interface BaseUser {
  name: string;
  username: string;
  phone: number;
  email: string;
  password: string;
}

export interface User extends BaseUser {
  id: number;
}
