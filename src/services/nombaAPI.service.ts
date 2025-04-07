import axios from 'axios';
import { getHeaders } from './nombaAuth.service';
import { initiateFundingType } from '../types/funding.type';
import { initiateWithdrawalType } from '../types/withdrawal.type';

const ACCOUNT_ID = process.env.ACCOUNT_ID || '';
const NOMBA_BASE_URL = process.env.NOMBA_BASE_URL || '';

/**
 * Initiate a payment transaction
 */
async function initiateTransaction(data: initiateFundingType) {
  const headers = await getHeaders();

  const transactionData = {
    orderReference: data.systemRef,
    customerId: data.userId,
    callbackUrl: "http://localhost:3000/funding/callback",
    customerEmail: data.customerEmail,
    amount: data.amount,
    currency: 'NGN',
    accountId: ACCOUNT_ID,
  };

  try {
    const res: any = await axios.post(`${NOMBA_BASE_URL}/checkout/order`, {"order": transactionData}, { headers });
    return res.data.data;
  } catch (error: any) {
    console.error('Error initiating transaction:', error?.response?.data || error.message);
    throw error;
  }
}

async function verifyTransaction(orderReference: string) {
  const headers = await getHeaders();

  const res: any = await axios.get(`${NOMBA_BASE_URL}/checkout/transaction`, {
    headers,
    params: {
      idType: "ORDER_ID",
      id: orderReference
    }
  });
  return res.data.data;
}

async function initiateWithdrawal(data: initiateWithdrawalType) {
  const headers = await getHeaders();

  const withdrawalData = {
    amount: data.amount,
    accountName: data.accountName,
    accountNumber: data.accountNumber,
    bankCode: data.bankCode,
    merchantTxRef: data.systemRef,
    senderName: data.senderName,
    narration: data.narration
  };

  const res: any = await axios.post(`${NOMBA_BASE_URL}/transfers/bank`, withdrawalData, { headers });
  console.log('res nomba', res);
  return res.data.data;
}

export { initiateTransaction, verifyTransaction, initiateWithdrawal };
