import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateEstateDto, EditEstateDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { EstateFilter } from './estate.filter';
import { Estate } from '@prisma/client';

@Injectable()
export class EstateService {
  constructor(private prisma: PrismaService) {}

  getEstates(userId: number): Promise<Estate[]> {
    return this.prisma.estate.findMany({
      where: {
        userId,
      },
    });
  }

  async getEstatesByCategory(filter: EstateFilter): Promise<Estate[]> {
    const where: { [key: string]: unknown } = {};
    const filterKeys = Object.keys(filter);

    for (const key of filterKeys) {
      const filterValue = filter[key];

      if (filterValue) {
        if (typeof filterValue === 'object') {
          where[key] = { ...filterValue };
        } else {
          where[key] = { equals: filterValue };
        }
      }
    }

    return this.prisma.estate.findMany({
      where,
    });
  }

  getEstateById(userId: number, estateId: number): Promise<Estate | null> {
    return this.prisma.estate.findFirst({
      where: {
        id: estateId,
        userId,
      },
    });
  }

  async createEstate(userId: number, dto: CreateEstateDto): Promise<Estate> {
    return this.prisma.estate.create({
      data: {
        userId,
        ...dto,
      },
    });
  }

  async editEstateById(
    userId: number,
    estateId: number,
    dto: EditEstateDto,
  ): Promise<Estate> {
    const estate = await this.prisma.estate.findUnique({
      where: {
        id: estateId,
      },
    });

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

  async deleteEstateById(userId: number, estateId: number): Promise<void> {
    const estate: Estate | null = await this.prisma.estate.findUnique({
      where: {
        id: estateId,
      },
    });

    if (!estate || estate.userId !== userId)
      throw new ForbiddenException('Access to resources denied');

    await this.prisma.estate.delete({
      where: {
        id: estateId,
      },
    });
  }
}
