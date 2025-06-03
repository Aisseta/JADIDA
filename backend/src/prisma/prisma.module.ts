import { Global, Module } from '@nestjs/common'; 
import { PrismaService } from './prisma.service';


@Global() //rend le module Prisma accessible dans tout le fichier 
@Module({
    providers:[PrismaService],
    exports:[PrismaService], 
})

export class PrismaModule {}