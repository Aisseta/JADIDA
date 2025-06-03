import { IsAlphanumeric, IsEmail, IsEmpty } from "class-validator"

export class AuthDto{

    @IsEmail()
    email:string;
   
    @IsAlphanumeric()
    age: number;
    
    @IsEmpty()
    lastname: string;

}