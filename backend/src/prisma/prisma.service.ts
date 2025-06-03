import { Injectable } from '@nestjs/common'; 
import { PrismaClient } from '@prisma/client'


@Injectable()

export class PrismaService extends PrismaClient{
    constructor() {
        super({
            datasources:{
            db:{
                url:'postegresql:jadida_user:jadida@localhost:5432/jadida_db?schema=public'
            }
            }
        })
    }
}