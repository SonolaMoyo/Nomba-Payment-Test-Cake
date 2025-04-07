import crypto from 'crypto';
import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import { Transaction } from '../models/transaction.model';
import { Funding } from '../models/funding.model';
import { Withdrawal } from '../models/withdrawal.model';
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY || '';

function verifyWebhookSignature(req: Request, res: Response, next: NextFunction) {
    const payload = JSON.stringify(req.body);
    const signature = req.header('nomba-signature') || '';
    const signatureAlgorithm = req.header('nomba-signature-algorithm') === 'HmacSHA256' ? 'sha256' : 'sha512';

    const computedHash = crypto.createHmac(signatureAlgorithm, SECRET_KEY)
        .update(payload)
        .digest('hex'); 

    console.log(signature, computedHash);

    if (signature === computedHash) {
        console.log('✅ Signature is valid');
        next();
    } else {
        console.log('❌ Invalid signature');
        throw new Error('Invalid signature');
    }
}

function processNombaWebhook(data: any) {
    if(data.event_type == "payment_success") {
        processPaymentSuccess(data.data.order);
    } else if(data.event_type == "payment_reversal") {
        processPaymentReversal(data.data.order);
    } else if(data.event_type == "payment_failed") {
        processPaymentFailed(data.data.order);
    } else if(data.event_type == "payout_success") {
        processPayoutSuccess(data.data.transaction);
    } else if(data.event_type == "payout_refund") {
        processPayoutRefund(data.data.transaction);
    } else if(data.event_type == "payout_failed") {
        processPayoutFailed(data.data.transaction);
    }
}

async function processPaymentSuccess(order: any) {
    try {
        const funding = await Funding.findOne({ reference: order.orderId });
        if (!funding) {
            throw new Error('Funding not found');
        }
        await Funding.findByIdAndUpdate(funding._id, { status: 'successful' }, { new: true });
        const existingTransaction = await Transaction.findOne({ reference: order.orderId });
        if (!existingTransaction) {
            await Transaction.create({
                userId: funding.userId,
                amount: order.amount,
                type: 'credit',
                source: 'nomba',
                reference: order.orderId,
                narration: 'Funding from Nomba'
            });
        }
        return true;
    } catch (error) {
        console.log('Error processing successful payment:', error);
        console.error('Error processing successful payment:', error);
        throw error;
    }
}

async function processPaymentReversal(order: any) {
    try {
        const transaction = await Transaction.findOneAndDelete({ reference: order.orderId });
        if (!transaction) {
            throw new Error('Transaction not found');
        }
        const funding = await Funding.findOne({ reference: order.orderId });
        if (!funding) {
            throw new Error('Funding not found');
        }
        await Funding.findByIdAndUpdate(funding._id, { status: 'failed' }, { new: true });
        return true;
    } catch (error) {
        console.log('Error processing payment reversal:', error);
        console.error('Error processing payment reversal:', error);
        throw error;
    }
}

async function processPaymentFailed(order: any) {
    try {
        const funding = await Funding.findOne({ reference: order.orderId });
        if (!funding) {
            throw new Error('Funding not found');
        }
        await Funding.findByIdAndUpdate(funding._id, { status: 'failed' }, { new: true });
        return true;
    } catch (error) {
        console.log('Error processing failed payment:', error);
        console.error('Error processing failed payment:', error);
        throw error;
    }
}

async function processPayoutSuccess(transaction: any) {
    try {
        const withdrawal = await Withdrawal.findOne({ reference: transaction.merchantTxRef, transactionId: transaction.transactionId });
        if (!withdrawal) {
            throw new Error('Withdrawal not found');
        }
        await Withdrawal.findByIdAndUpdate(withdrawal._id, { status: 'successful' }, { new: true });
        const existingTransaction = await Transaction.findOne({ reference: transaction.merchantTxRef });
        if (!existingTransaction) {
            await Transaction.create({
                userId: withdrawal.userId,
                amount: transaction.transactionAmount,
                type: 'debit',
                source: 'nomba',
                reference: transaction.merchantTxRef,
                transactionId: transaction.transactionId,
                narration: 'Withdrawal from Nomba'
            });
        }
        return true;
    } catch (error) {
        console.log('Error processing successful payout:', error);
        console.error('Error processing successful payout:', error);
        throw error;
    }
}

async function processPayoutRefund(transaction: any) {
    try {
        const transactionRecord = await Transaction.findOneAndDelete({ transactionId: transaction.transactionId });
        if (!transactionRecord) {
            throw new Error('Transaction not found');
        }
        const withdrawal = await Withdrawal.findOne({ transactionId: transaction.transactionId });
        if (!withdrawal) {
            throw new Error('Withdrawal not found');
        }
        await Withdrawal.findByIdAndUpdate(withdrawal._id, { status: 'failed' }, { new: true });
        return true;
    } catch (error) {
        console.log('Error processing payout refund:', error);
        console.error('Error processing payout refund:', error);
        throw error;
    }
}

async function processPayoutFailed(transaction: any) {
    try {
        const withdrawal = await Withdrawal.findOne({ reference: transaction.merchantTxRef });
        if (!withdrawal) {
            throw new Error('Withdrawal not found');
        }
        await Withdrawal.findByIdAndUpdate(withdrawal._id, { status: 'failed' }, { new: true });
        return true;
    } catch (error) {
        console.log('Error processing failed payout:', error);
        console.error('Error processing failed payout:', error);
        throw error;
    }
}

export { verifyWebhookSignature, processNombaWebhook };
