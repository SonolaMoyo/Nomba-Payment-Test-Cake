export type FundingData = {
  userId: string;
  amount: number;
  status: 'pending' | 'successful' | 'failed';
  reference?: string;
  requestedAt: string;
};

export type initiateFundingType = {
    userId: string;
    customerEmail: string;
    amount: number;
    systemRef: string;
}
