import { Injectable } from "@nestjs/common";
import { AuthDto } from "src/dto/auth.dto";

@Injectable({})
export class AuthService{

    register(dto:AuthDto){
        // générer un hash pour le mot de passe avec Argon
        
        const argon = require('argon2'); 
        
        // enregister le new user dans la db

       return {msg: 'Your are now register'};
    }
}
