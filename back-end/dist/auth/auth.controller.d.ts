import { AuthService } from './auth.service';
export declare class AuthController {
    private service;
    constructor(service: AuthService);
    login(request: any): Promise<{
        access_token: string;
    }>;
}
