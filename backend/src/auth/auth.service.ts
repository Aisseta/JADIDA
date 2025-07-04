import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from '../prisma/prisma.service'; 
import { AuthDto } from "../dto";
import { LoginDto } from "../dto/login.dto";
import * as argon from 'argon2';
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService
    ) {}

    async register(dto: AuthDto) {
        // Vérifie si l'utilisateur existe déjà
        const existingUser = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });

        if (existingUser) {
            throw new ForbiddenException('Email déjà utilisé');
        }

        // Hash le mot de passe
        const hash = await argon.hash(dto.password);

        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                password: hash,
                lastname: dto.lastname,
                firstname: dto.firstname,
                role: dto.role,
                pseudo: dto.pseudo,
                sexe: dto.sexe,
                acceptedPrivacyPolicy: dto.acceptedPrivacyPolicy ?? false,
                url_photo_profil: null,
                address: null,
                city: null,
                description: null,
            },
        });
        console.log('user created:', user); 

        return {
            message: 'Inscription réussie',
            user: {
                id: user.id_user,
                email: user.email,
                firstname: user.firstname,
                lastname: user.lastname,
                pseudo: user.pseudo,
                role: user.role,
            },
        };
    }

  async login(dto: LoginDto): Promise<string> {
    const user = await this.prisma.user.findUnique({
        where: { email: dto.email },
    });

    if (!user) {
        throw new ForbiddenException('Email ou mot de passe incorrect');
    }

    const isPasswordValid = await argon.verify(user.password, dto.password);

    if (!isPasswordValid) {
        throw new ForbiddenException('Email ou mot de passe incorrect');
    }

    const token = await this.signToken(user.id_user, user.email);
    return token;
}

    async signToken(userId: number, email: string): Promise<string> {
        const payload = {
            sub: userId,
            email,
        };

        const token = await this.jwt.signAsync(payload, {
            expiresIn: '1h',
            secret: process.env.JWT_SECRET || 'mon_secret_jwt',
        });

        return token;
    }
}
