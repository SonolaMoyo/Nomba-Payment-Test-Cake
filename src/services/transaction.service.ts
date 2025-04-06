import { Transaction } from "../models/transaction.model";
import mongoose from "mongoose";
import { TransactionData } from '../types/transaction.type';

export const createTransaction = async (data: any) => {
  return await Transaction.create(data);
};

export const getUserTransactions = async (userId: string) => {
  return await Transaction.find({ userId }).sort({ createdAt: -1 });
};

export const calculateUserBalance = async (userId: string) => {
  const credits = await Transaction.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userId), type: "credit" } },
    { $group: { _id: null, total: { $sum: "$amount" } } }
  ]);
  const debits = await Transaction.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userId), type: "debit" } },
    { $group: { _id: null, total: { $sum: "$amount" } } }
  ]);
  return (credits[0]?.total || 0) - (debits[0]?.total || 0);
};

export const purchaseLand = async (data: TransactionData) => {
  return await Transaction.create({ ...data, type: 'debit', source: 'purchase' });
};

export const creditLandIncome = async (data: TransactionData) => {
  return await Transaction.create({ ...data, type: 'credit', source: 'income' });
};

export const getTransactionSummary = async (userId: string) => {
  const credits = await Transaction.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userId), type: 'credit' } },
    { $group: { _id: null, total: { $sum: '$amount' } } }
  ]);
  const debits = await Transaction.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userId), type: 'debit' } },
    { $group: { _id: null, total: { $sum: '$amount' } } }
  ]);
  const income = await Transaction.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userId), source: 'income' } },
    { $group: { _id: null, total: { $sum: '$amount' } } }
  ]);
  return {
    totalCredit: credits[0]?.total || 0,
    totalDebit: debits[0]?.total || 0,
    totalIncome: income[0]?.total || 0
  };
};
