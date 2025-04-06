import { Request, Response } from "express";
import * as TransactionService from "../services/transaction.service";

export const fundAccountWebhook = async (req: Request, res: Response): Promise<any> => {
  const { userId, amount, source, reference } = req.body;
  await TransactionService.createTransaction({
    userId,
    amount,
    type: "credit",
    source,
    reference,
    narration: "Funded via Monnify"
  });
  return res.status(200).json({ message: "Transaction recorded." });
};

export const getBalance = async (req: Request, res: Response): Promise<any> => {
  const { userId } = req.params;
  const balance = await TransactionService.calculateUserBalance(userId);
  return res.status(200).json({ balance });
};

export const purchaseLand = async (req: Request, res: Response): Promise<any> => {
  const { userId, amount, reference, narration } = req.body;
  const transaction = await TransactionService.purchaseLand({
    id: '', // Generate or assign an ID as needed
    user_id: userId,
    amount,
    type: 'debit',
    source: 'purchase',
    reference,
    narration,
    timestamp: new Date().toISOString()
  });
  return res.status(200).json({ message: 'Land purchased successfully.', transaction });
};

export const creditLandIncome = async (req: Request, res: Response): Promise<any> => {
  const { userId, amount, reference, narration } = req.body;
  const transaction = await TransactionService.creditLandIncome({
    id: '', // Generate or assign an ID as needed
    user_id: userId,
    amount,
    type: 'credit',
    source: 'income',
    reference,
    narration,
    timestamp: new Date().toISOString()
  });
  return res.status(200).json({ message: 'Income credited successfully.', transaction });
};

export const getTransactionSummary = async (req: Request, res: Response): Promise<any> => {
  const { userId } = req.params;
  const summary = await TransactionService.getTransactionSummary(userId);
  return res.status(200).json(summary);
};
