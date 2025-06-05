import { Body, Controller, Get, Post} from "@nestjs/common";
import {AuthService } from "./auth.service"
import { log } from "node:console";
import { AuthDto } from "../dto"

 


@Controller('auth')
export class AuthController{

    constructor(private authService : AuthService) {}
        @Post('register')
        
        register(@Body() dto: AuthDto) {
            console.log({
                dto,
            });
            return this.authService.register(dto);
        }


       // @Post('login')
       // @Post('logout')
       // @Get('me')
       // @Get('refresh')
      
}


