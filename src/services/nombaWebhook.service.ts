import crypto from 'crypto';
import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

const SIGNATURE_KEY = process.env.SIGNATURE_KEY || '';

function verifyWebhookSignature(req: Request, res: Response, next: NextFunction) {
    const payload = JSON.stringify(req.body);
    const signature = req.header('nomba-signature') || '';
    const signatureAlgorithm = req.header('nomba-signature-algorithm') === 'HmacSHA256' ? 'sha256' : 'sha512';

    const computedHash = crypto.createHmac(signatureAlgorithm, SIGNATURE_KEY)
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

export { verifyWebhookSignature };
