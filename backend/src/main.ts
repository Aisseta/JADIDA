import "dd-trace/init";
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';



async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: 'http://localhost:3000', // autorise les requêtes depuis le frontend
      credentials: true,               // permet d’envoyer les cookies / headers d’auth
    },
  });

  
  
  app.useGlobalPipes(new ValidationPipe({  // permet d'utiliser les pipes dans tout le  scope 
    whitelist:true, // enlève les champs qui ne sont pas dans la dto
    forbidNonWhitelisted:true // rejette les requetes des champs pas qui ne sont pas dans la dto  
  }));
  await app.listen(7002);
}
bootstrap();
