import express from 'express';
import * as FundingController from '../controllers/funding.controller';

const router = express.Router();

router.post('/', FundingController.createFunding);
router.get('/:id', FundingController.getFundingById);
router.get('/user/:userId', FundingController.getUserFundings);
router.get('/verify/:reference', FundingController.verifyFunding);
router.patch('/:id/status', FundingController.updateFundingStatus);

export default router;
