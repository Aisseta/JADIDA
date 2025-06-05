import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from "../dto";
export declare class AuthService {
    private prisma;
    constructor(prisma: PrismaService);
    register(dto: AuthDto): Promise<{
        user: {
            id_user: number;
            url_photo_profil: string | null;
            lastname: string;
            firstname: string;
            role: string;
            pseudo: string;
            sexe: string;
            email: string;
            password: string;
            address: string | null;
            city: string | null;
            description: string | null;
            createdAt: Date;
            acceptedPrivacyPolicy: boolean;
        };
    }>;
}
