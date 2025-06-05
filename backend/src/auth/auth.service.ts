import { Injectable } from "@nestjs/common";
import { PrismaService } from '../prisma/prisma.service'; 
import { AuthDto } from "../dto"
import * as argon from 'argon2';


@Injectable({})
export class AuthService{
    constructor(private prisma: PrismaService){}

    async register(dto:AuthDto){
        // générer un hash pour le mot de passe avec Argon
        
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
            }

        }); 

       return {user};
    }
}
