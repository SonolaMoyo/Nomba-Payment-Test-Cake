import { Request, Response } from 'express';
import * as LandService from '../services/land.service';

export const createLand = async (req: Request, res: Response): Promise<any> => {
  const { title, price, location } = req.body;
  try {
    const land = await LandService.createLand({ title, price, location });
    res.status(201).json(land);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getLandById = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  try { 
    const land = await LandService.getLandById(id);
    res.status(200).json(land);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};  

export const getAllLands = async (req: Request, res: Response): Promise<any> => {
  try {
    const lands = await LandService.getAllLands();
    res.status(200).json(lands);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateLandById = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const { title, price, location } = req.body;
  try {
    const land = await LandService.updateLandById(id, { title, price, location });
    res.status(200).json(land);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteLandById = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  try { 
    const land = await LandService.deleteLandById(id);
    res.status(200).json(land);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
