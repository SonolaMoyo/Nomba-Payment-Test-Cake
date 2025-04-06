import { User } from '../models/user.model';
import { UserData } from '../types/user.type';

export const createUser = async (userData: UserData) => {
  try {
    const user = new User(userData);
    await user.save();
    return user;
  } catch (error: any) {
    throw new Error('Error creating user: ' + error.message);
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error: any) {
    throw new Error('Error retrieving user: ' + error.message);
  }
};

export const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error: any) {
    throw new Error('Error retrieving users: ' + error.message);
  }
};

export const updateUserById = async (id: string, updateData: Partial<UserData>) => {
  try {
    const user = await User.findByIdAndUpdate(id, updateData, { new: true });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error: any) {
    throw new Error('Error updating user: ' + error.message);
  }
};

export const deleteUserById = async (id: string) => {
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error: any) {
    throw new Error('Error deleting user: ' + error.message);
  }
};
