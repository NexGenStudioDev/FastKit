import { Router } from 'express';
import SuperAdminController from './SuperAdmin.controller';
import AuthMiddleWare from '../Auth/AuthMiddleWare';

const router: Router = Router();

// Route to create a new admin
router.post(
  '/v1/create-admin',
  AuthMiddleWare.validateSuperAdmin, // Middleware to validate SuperAdmin
  SuperAdminController.createAdmin, // Controller to handle admin creation
);

export { router as SuperAdminRouter };
