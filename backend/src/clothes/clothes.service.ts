import {CreateClothingDto } from "/"

@Injectable()
export class ClothingService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateClothingDto) {
    return this.prisma.clothing.create({
      data: dto,
    })
  }

  findAll(filters?: any) {
    return this.prisma.clothing.findMany({
      where: {
        ...filters,
      },
    })
  }

  findOne(id_clothing: number) {
    return this.prisma.clothing.findUnique({
      where: { id_clothing },
    })
  }

  update(id_clothing: number, dto: UpdateClothingDto) {
    return this.prisma.clothing.update({
      where: { id_clothing },
      data: dto,
    })
  }

  remove(id_clothing: number) {
    return this.prisma.clothing.delete({
      where: { id_clothing },
    })
  }
}
