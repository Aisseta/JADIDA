"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const argon = require("argon2");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    prisma;
    jwt;
    constructor(prisma, jwt) {
        this.prisma = prisma;
        this.jwt = jwt;
    }
    async register(dto) {
        const existingUser = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if (existingUser) {
            throw new common_1.ForbiddenException('Email déjà utilisé');
        }
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
    async login(dto) {
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if (!user) {
            throw new common_1.ForbiddenException('Email ou mot de passe incorrect');
        }
        const isPasswordValid = await argon.verify(user.password, dto.password);
        if (!isPasswordValid) {
            throw new common_1.ForbiddenException('Email ou mot de passe incorrect');
        }
        const token = await this.signToken(user.id_user, user.email);
        return token;
    }
    async signToken(userId, email) {
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
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map