import { Router } from 'express';
import SuperAdminController from './SuperAdmin.controller';
import AuthMiddleWare from '../../../middleware/AuthMiddleWare';

const router = Router();

router.post(
  '/v1/create-admin',
  AuthMiddleWare.validateSuperAdmin,
  SuperAdminController.createAdmin,
);

export { router as SuperAdminRouter };
