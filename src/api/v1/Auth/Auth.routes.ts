import { Router } from 'express';
import AuthController from './Auth.controller';

const router: Router = Router();

router.post('/v1/auth/login', AuthController.login);

export { router as AuthRoutes };
