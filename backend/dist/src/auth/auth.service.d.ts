import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from "../dto";
import { LoginDto } from "../dto/login.dto";
import { JwtService } from "@nestjs/jwt";
export declare class AuthService {
    private prisma;
    private jwt;
    constructor(prisma: PrismaService, jwt: JwtService);
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
    login(dto: LoginDto): Promise<string>;
    signToken(userId: number, email: string): Promise<string>;
}
