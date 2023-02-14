import { Injectable } from '@nestjs/common';
import { CreateEstateDto, EditEstateDto } from './dto';

@Injectable()
export class EstateService {
  getEstates(userId: number) {}

  getEstateById(userId: number, estateId: number) {}

  createEstate(userId: number, dto: CreateEstateDto) {}

  editEstateById(userId: number, estateId: number, dto: EditEstateDto) {}

  deleteEstateById(userId: number, estateId: number) {}
}
