import { Request, Response } from 'express';
import * as WithdrawalService from '../services/withdrawal.service';
import { v4 as uuidv4 } from 'uuid';
export const createWithdrawal = async (req: Request, res: Response): Promise<any> => {
  const { userId, amount, accountNumber, accountName, bankCode, senderName, narration } = req.body;
  const withdrawal = await WithdrawalService.createWithdrawal({
    userId,
    amount,
    accountNumber,
    accountName,
    bankCode,
    senderName,
    narration,
    systemRef: uuidv4()
  });
  return res.status(201).json({ message: 'Withdrawal request created.', withdrawal });
};

export const withdrawalWebhook = async (req: Request, res: Response): Promise<any> => {
  await WithdrawalService.withdrawalWebhook(req.body);
  return res.status(200).json({ message: 'Withdrawal webhook received.' });
};

export const getUserWithdrawals = async (req: Request, res: Response): Promise<any> => {
  const { userId } = req.params;
  const withdrawals = await WithdrawalService.getUserWithdrawals(userId);
  return res.status(200).json(withdrawals);
};

export const getWithdrawalById = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const withdrawal = await WithdrawalService.getWithdrawalById(id);
  if (!withdrawal) {
    return res.status(404).json({ message: 'Withdrawal not found.' });
  }
  return res.status(200).json(withdrawal);
};

export const updateWithdrawalStatus = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const { status } = req.body;
  const updatedWithdrawal = await WithdrawalService.updateWithdrawalStatus(id, status);
  if (!updatedWithdrawal) {
    return res.status(404).json({ message: 'Withdrawal not found.' });
  }
  return res.status(200).json({ message: 'Withdrawal status updated.', updatedWithdrawal });
};
