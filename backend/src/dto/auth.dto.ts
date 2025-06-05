import {
  IsEmail,
  IsString,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class AuthDto {
  @IsString()
  lastname: string;

  @IsString()
  firstname: string;

  @IsString()
  role: string;

  @IsString()
  pseudo: string;

  @IsString()
  sexe: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsBoolean()
  @IsOptional()
  acceptedPrivacyPolicy?: boolean;

  // Optional fields
  @IsOptional()
  @IsString()
  url_photo_profil?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
