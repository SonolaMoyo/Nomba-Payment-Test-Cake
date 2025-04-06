import express from 'express';
import * as UserController from '../controllers/user.controller';

const router = express.Router();

router.post('/', UserController.createUser);
router.get('/:id', UserController.getUserById);
router.get('/', UserController.getAllUsers);
router.put('/:id', UserController.updateUserById);
router.delete('/:id', UserController.deleteUserById);

export default router;
