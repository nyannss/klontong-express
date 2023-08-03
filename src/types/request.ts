export interface AuthRequest extends Request {
  authInfo: AuthInfo;
}

interface AuthInfo {
  id: number;
  email: string;
  role: string;
}
