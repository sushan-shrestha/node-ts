/**
 * Required External Modules and Interfaces
 */

import express, { NextFunction, Request, Response } from 'express'
import * as UserService from './users.service'

import { BaseUser, User } from './user.interface'

/**
 * Router Definition
 */
export const usersRouter = express.Router();


/**
 * Controller Definitions
 */

// GET users
usersRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await UserService.findAll();

    res.json(users)
  } catch (e: any) {
    res.status(500).send(e.message)
  }
})

// GET users/:id

usersRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const user: User = await UserService.find(id);

    res.json(user)
  } catch (e: any) {
    res.status(500).send(e.message)
  }

})

// POST users

usersRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {

    const userDetail: User = req.body;

    const newUser = await UserService.create(userDetail);

    res.status(201).send(newUser)
  } catch (e: any) {
    res.status(500).send(e.message)
  }
})

// PUT users/:id
usersRouter.put("/:id", async (req: Request, res: Response, next: NextFunction) => {

  try {

    const id: number = parseInt(req.params.id, 10);
    const userDetail: User = req.body;

    const userExists: User = await UserService.find(id);

    if (!userExists) {
      return res.status(404).send({ message: "User not found" })
    }

    const updatedUser = await UserService.update(userDetail, id);

    res.status(201).send(updatedUser)
  } catch (e: any) {
    res.status(500).send(e.message)
  }
})


// DELETE users/:id

usersRouter.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {

  try {

    const id: number = parseInt(req.params.id, 10);

    const userExists: User = await UserService.find(id);

    if (!userExists) {
      return res.status(404).send({ message: "User not found" })
    }

    const deleteUser = await UserService.remove(id)

    res.sendStatus(204)
  } catch (e: any) {
    res.status(500).send(e.message)
  }
})
