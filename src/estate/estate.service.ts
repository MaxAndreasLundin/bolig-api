import { ForbiddenException, Injectable } from '@nestjs/common';
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

  getEstateById(userId: number, estateId: number) {
    return this.prisma.estate.findFirst({
      where: {
        id: estateId,
        userId,
      },
    });
  }

  async createEstate(userId: number, dto: CreateEstateDto) {
    return this.prisma.estate.create({
      data: {
        userId,
        ...dto,
      },
    });
  }

  async editEstateById(userId: number, estateId: number, dto: EditEstateDto) {
    // get the bookmark by id
    const estate = await this.prisma.estate.findUnique({
      where: {
        id: estateId,
      },
    });

    // check if user owns the bookmark
    if (!estate || estate.userId !== userId)
      throw new ForbiddenException('Access to resources denied');

    return this.prisma.estate.update({
      where: {
        id: estateId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteEstateById(userId: number, estateId: number) {
    const estate = await this.prisma.estate.findUnique({
      where: {
        id: estateId,
      },
    });

    // check if user owns the bookmark
    if (!estate || estate.userId !== userId)
      throw new ForbiddenException('Access to resources denied');

    await this.prisma.estate.delete({
      where: {
        id: estateId,
      },
    });
  }
}
