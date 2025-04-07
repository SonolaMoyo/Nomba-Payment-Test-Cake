import { Funding } from '../models/funding.model';
import { Transaction } from '../models/transaction.model';
import { initiateFundingType } from '../types/funding.type';
import { initiateTransaction, verifyTransaction } from './nombaAPI.service';

export const createFunding = async (data: initiateFundingType) => {
  const nombaTransaction = await initiateTransaction(data);
  await Funding.create({ userId: data.userId, amount: data.amount, status: 'pending', reference: nombaTransaction.orderReference, systemRef: data.systemRef });
  return nombaTransaction;
};

export const getUserFundings = async (userId: string) => {
  return await Funding.find({ userId }).sort({ requestedAt: -1 });
};

export const getFundingById = async (id: string) => {
  return await Funding.findById(id);
};

export const updateFundingStatus = async (id: string, status: 'pending' | 'successful' | 'failed') => {
  return await Funding.findByIdAndUpdate(id, { status }, { new: true });
};

export const verifyFunding = async (reference: string) => {
  const funding = await Funding.findOne({ reference });
  if (!funding) {
    throw new Error('Funding not found');
  }
  const nombaTransaction = await verifyTransaction(reference);
  if (nombaTransaction.success) {
    await Funding.findByIdAndUpdate(funding._id, { status: 'successful' }, { new: true });
    const existingTransaction = await Transaction.findOne({ reference: nombaTransaction.order.orderId });
    if (!existingTransaction) {
      const transaction = await Transaction.create({
        userId: funding.userId,
        amount: funding.amount,
        type: 'credit',
        source: 'nomba',
        reference: nombaTransaction.order.orderId,
        narration: 'Funding from Nomba'
      });
      console.log(transaction);
    }
  } else {
    await Funding.findByIdAndUpdate(funding._id, { status: 'failed' }, { new: true });
  }
  return nombaTransaction;
};
