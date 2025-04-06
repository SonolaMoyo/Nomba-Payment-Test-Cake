import { Request, Response } from 'express';
import * as UserService from '../services/user.service';

export const createUser = async (req: Request, res: Response): Promise<any> => {
  const { email, name, phone } = req.body;
  try {
    const user = await UserService.createUser({ email, name, phone });
    res.status(201).json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserById = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  try {
    const user = await UserService.getUserById(id);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllUsers = async (req: Request, res: Response): Promise<any> => {
  try {
    const users = await UserService.getAllUsers();
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};  

export const updateUserById = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const { email, name, phone } = req.body;
  try {
    const user = await UserService.updateUserById(id, { email, name, phone });
    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUserById = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  try {
    const user = await UserService.deleteUserById(id);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};



