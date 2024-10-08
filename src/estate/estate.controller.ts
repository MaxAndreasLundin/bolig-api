import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { EstateService } from './estate.service';
import { GetUser } from '../auth/decorator';
import { CreateEstateDto, EditEstateDto } from './dto';
import { EstateFilter } from './estate.filter';
import { Estate } from '@prisma/client';

@Controller('estates')
export class EstateController {
  constructor(private estateService: EstateService) {}

  @UseGuards(JwtGuard)
  @Get()
  getEstates(@GetUser('id') userId: number): Promise<Estate[]> {
    return this.estateService.getEstates(userId);
  }

  @Post('category')
  getEstatesByCategory(
    @Body(new ValidationPipe()) filter: EstateFilter,
  ): Promise<Estate[]> {
    return this.estateService.getEstatesByCategory(filter);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  getEstateById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) estateId: number,
  ): Promise<Estate | null> {
    return this.estateService.getEstateById(userId, estateId);
  }

  @UseGuards(JwtGuard)
  @Post()
  createEstate(
    @GetUser('id') userId: number,
    @Body() dto: CreateEstateDto,
  ): Promise<Estate> {
    return this.estateService.createEstate(userId, dto);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  editEstateById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) estateId: number,
    @Body() dto: EditEstateDto,
  ): Promise<Estate> {
    return this.estateService.editEstateById(userId, estateId, dto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  deleteEstateById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) estateId: number,
  ): Promise<void> {
    return this.estateService.deleteEstateById(userId, estateId);
  }
}
