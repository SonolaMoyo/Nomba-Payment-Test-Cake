import express from 'express';
import * as LandController from '../controllers/land.controller';

const router = express.Router();

router.post('/', LandController.createLand);
router.get('/:id', LandController.getLandById);
router.get('/', LandController.getAllLands);
router.put('/:id', LandController.updateLandById);
router.delete('/:id', LandController.deleteLandById);

export default router;

