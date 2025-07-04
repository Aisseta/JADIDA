import { AuthService } from "./auth.service";
import { AuthDto } from "../dto";
import { Response } from "express";
import { LoginDto } from "../dto/login.dto";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(dto: AuthDto): Promise<{
        message: string;
        user: {
            id: number;
            email: string;
            firstname: string;
            lastname: string;
            pseudo: string;
            role: string;
        };
    }>;
    login(logindto: LoginDto, res: Response): Promise<{
        message: string;
    }>;
    logout(res: Response): {
        message: string;
    };
}
