import { Body, Controller, Post, Req } from "@nestjs/common";
import {AuthService } from "./auth.service"
import { log } from "node:console";
import { AuthDto } from "src/dto/auth.dto";



@Controller('auth')
export class AuthController{

    constructor(private authService : AuthService) {}
        @Post('register')
        
        register(@Body() authDto: AuthDto) {
            console.log({
                
            })
            //return this.authService.register();
        }
}


