import { Body, Controller, Res, Post} from "@nestjs/common";
import {AuthService } from "./auth.service"
import { log } from "node:console";
import { AuthDto } from "../dto"
import { Response } from "express";
import { LoginDto } from "../dto/login.dto";

 


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

   @Post('login')
async login(
  @Body() logindto: LoginDto, 
  @Res({ passthrough: true }) res: Response
) {
  const token = await this.authService.login(logindto);
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });
  return { message: 'Connexion réussie' };
}

    @Post('logout')
        logout(@Res({ passthrough: true }) res: Response) {
            res.clearCookie('token');
            return { message: 'Logout successful' };
        }
    }



