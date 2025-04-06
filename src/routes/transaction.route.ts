import express from "express";
import * as TransactionController from "../controllers/transaction.controller";

const router = express.Router();

router.post("/webhook/fund", TransactionController.fundAccountWebhook);
router.get("/balance/:userId", TransactionController.getBalance);
router.post('/purchase', TransactionController.purchaseLand);
router.post('/income', TransactionController.creditLandIncome);
router.get('/summary/:userId', TransactionController.getTransactionSummary);

export default router;
