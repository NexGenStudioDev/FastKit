import { Request, Response } from 'express';

class AuthController {
 
    async login(req: Request, res: Response) {}

    async register(req: Request, res: Response) {}

    async logout(req: Request, res: Response) {}

    async forgotPassword(req: Request, res: Response) {}
}

export default new AuthController();