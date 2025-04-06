import { Land } from '../models/land.model';
import { LandData } from '../types/land.type';

export const createLand = async (landData: LandData) => {
  try {
    const land = new Land(landData);
    await land.save();
    return land;
  } catch (error: any) {
    throw new Error('Error creating land: ' + error.message);
  }
};

export const getLandById = async (id: string) => {
  try {
    const land = await Land.findById(id);
    if (!land) {
      throw new Error('Land not found');
    }
    return land;
  } catch (error: any) {
    throw new Error('Error retrieving land: ' + error.message);
  }
};

export const getAllLands = async () => {
  try {
    const lands = await Land.find();
    return lands;
  } catch (error: any) {
    throw new Error('Error retrieving lands: ' + error.message);
  }
};

export const updateLandById = async (id: string, updateData: Partial<LandData>) => {
  try {
    const land = await Land.findByIdAndUpdate(id, updateData, { new: true });
    if (!land) {
      throw new Error('Land not found');
    }
    return land;
  } catch (error: any) {
    throw new Error('Error updating land: ' + error.message);
  }
};

export const deleteLandById = async (id: string) => {
  try {
    const land = await Land.findByIdAndDelete(id);
    if (!land) {
      throw new Error('Land not found');
    }
    return land;
  } catch (error: any) {
    throw new Error('Error deleting land: ' + error.message);
  }
};


// todo: Get Land ownership
