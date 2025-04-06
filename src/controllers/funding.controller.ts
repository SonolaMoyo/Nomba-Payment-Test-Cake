import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import * as FundingService from '../services/funding.service';

export const createFunding = async (req: Request, res: Response): Promise<any> => {
  const { userId, amount, customerEmail, systemRef } = req.body;
  const funding = await FundingService.createFunding({
    userId,
    systemRef: uuidv4(),
    amount,
    customerEmail
  });
  return res.status(201).json({ message: 'Funding request created.', funding });
};

export const getUserFundings = async (req: Request, res: Response): Promise<any> => {
  const { userId } = req.params;
  const fundings = await FundingService.getUserFundings(userId);
  return res.status(200).json(fundings);
};

export const getFundingById = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const funding = await FundingService.getFundingById(id);
  if (!funding) {
    return res.status(404).json({ message: 'Funding not found.' });
  }
  return res.status(200).json(funding);
};

export const updateFundingStatus = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const { status } = req.body;
  const updatedFunding = await FundingService.updateFundingStatus(id, status);
  if (!updatedFunding) {
    return res.status(404).json({ message: 'Funding not found.' });
  }
  return res.status(200).json({ message: 'Funding status updated.', updatedFunding });
};

export const verifyFunding = async (req: Request, res: Response): Promise<any> => {
  const { reference } = req.params;
  const funding = await FundingService.verifyFunding(reference);
  return res.status(200).json(funding);
};
