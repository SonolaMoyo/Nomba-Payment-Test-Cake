import { Withdrawal } from '../models/withdrawal.model';
import { WithdrawalData } from '../types/withdrawal.type';
import { initiateWithdrawal } from './nombaAPI.service';
import { initiateWithdrawalType } from '../types/withdrawal.type';
import { processNombaWebhook } from './nombaWebhook.service';

export const createWithdrawal = async (data: initiateWithdrawalType) => {
  const nombaWithdrawal = await initiateWithdrawal(data);
  console.log('nombaWithdrawal', nombaWithdrawal);
  await Withdrawal.create({ userId: data.userId, amount: data.amount, status: 'pending', reference: data.systemRef, transactionId: nombaWithdrawal.id });
  if (nombaWithdrawal.status === "SUCCESS") {
    await Withdrawal.findOneAndUpdate({ reference: data.systemRef }, { status: 'successful' }, { new: true });
  }
  return nombaWithdrawal;
};

export const withdrawalWebhook = async (data: any, headers: any) => {
  console.log(data);
  console.log(headers);
  await processNombaWebhook(data);
  return true;
}

export const getUserWithdrawals = async (userId: string) => {
  return await Withdrawal.find({ userId }).sort({ requestedAt: -1 });
};

export const getWithdrawalById = async (id: string) => {
  return await Withdrawal.findById(id);
};

export const updateWithdrawalStatus = async (id: string, status: 'pending' | 'successful' | 'failed') => {
  return await Withdrawal.findByIdAndUpdate(id, { status }, { new: true });
};
