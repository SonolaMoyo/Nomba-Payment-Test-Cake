export type TransactionData = {
  id: string;
  user_id: string;
  amount: number;
  type: 'credit' | 'debit';
  source: 'funding' | 'withdrawal' | 'purchase' | 'income';
  reference?: string;
  narration?: string;
  timestamp: string;
};
