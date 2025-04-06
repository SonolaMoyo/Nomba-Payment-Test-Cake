import express from 'express';
import userRoutes from './routes/user.route';
import transactionRoutes from './routes/transaction.route';
import withdrawalRoutes from './routes/withdrawal.route';
import landRoutes from './routes/land.route';
import fundingRoutes from './routes/funding.route';
const app = express();

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/lands', landRoutes);
app.use('/api/withdrawals', withdrawalRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/fundings', fundingRoutes);

export default app;