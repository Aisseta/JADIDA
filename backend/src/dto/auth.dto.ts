import { IsAlphanumeric, IsEmail, IsEmpty } from "class-validator"



export class AuthDto{

    @IsEmail()
    @IsEmpty()
    email:string;
   
    @IsAlphanumeric()
    age: number;
    
    @IsEmpty()
    lastname: string;

}