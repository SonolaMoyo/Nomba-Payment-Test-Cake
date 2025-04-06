import express from 'express';
import * as WithdrawalController from '../controllers/withdrawal.controller';
import { verifyWebhookSignature } from '../services/nombaWebhook.service';
const router = express.Router();

router.post('/', WithdrawalController.createWithdrawal);
router.post('/webhook', verifyWebhookSignature, WithdrawalController.withdrawalWebhook);
router.get('/user/:userId', WithdrawalController.getUserWithdrawals);
router.get('/:id', WithdrawalController.getWithdrawalById);
router.patch('/:id/status', WithdrawalController.updateWithdrawalStatus);

export default router;
