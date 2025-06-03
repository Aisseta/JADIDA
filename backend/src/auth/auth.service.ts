import { Injectable } from "@nestjs/common";

@Injectable({})
export class AuthService{

    register(){
       return {msg: 'Your are now register'};
    }
}
