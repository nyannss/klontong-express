import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

interface AuthInfo extends JwtPayload {
  id: number;
  email: string;
  role: string;
}

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}
