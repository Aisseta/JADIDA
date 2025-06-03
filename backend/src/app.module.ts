import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [UserModule, 
            AuthModule
  ],
  controllers: [AuthController],
  providers: [AuthService]
  
})
export class AppModule {}