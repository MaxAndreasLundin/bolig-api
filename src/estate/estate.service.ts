import { Injectable } from '@nestjs/common';
import { CreateEstateDto, EditEstateDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EstateService {
  constructor(private prisma: PrismaService) {}

  getEstates(userId: number) {
    return this.prisma.estate.findMany({
      where: {
        userId,
      },
    });
  }

  getEstateById(userId: number, estateId: number) {}

  async createEstate(userId: number, dto: CreateEstateDto) {
    const estate = await this.prisma.estate.create({
      data: {
        userId,
        ...dto,
      },
    });
    return estate;
  }

  editEstateById(userId: number, estateId: number, dto: EditEstateDto) {}

  deleteEstateById(userId: number, estateId: number) {}
}
