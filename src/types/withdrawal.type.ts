export type WithdrawalData = {
  id: string;
  userId: string;
  amount: number;
  status: 'pending' | 'successful' | 'failed';
  reference?: string;
  requestedAt: string;
};

export type initiateWithdrawalType = {
    userId: string;
    amount: number;
    accountNumber: string;
    accountName: string;
    bankCode: string;
    senderName: string;
    narration: string;
    systemRef: string;
}
