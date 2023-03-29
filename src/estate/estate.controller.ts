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

@UseGuards(JwtGuard)
@Controller('estates')
export class EstateController {
  constructor(private estateService: EstateService) {}

  @Get()
  getEstates(@GetUser('id') userId: number) {
    return this.estateService.getEstates(userId);
  }

  @Post('category')
  getEstatesByCategory(@Body(new ValidationPipe()) filter: EstateFilter) {
    return this.estateService.getEstatesByCategory(filter);
  }

  @Get(':id')
  getEstateById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) estateId: number,
  ) {
    return this.estateService.getEstateById(userId, estateId);
  }

  @Post()
  createEstate(@GetUser('id') userId: number, @Body() dto: CreateEstateDto) {
    return this.estateService.createEstate(userId, dto);
  }

  @Patch(':id')
  editEstateById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) estateId: number,
    @Body() dto: EditEstateDto,
  ) {
    return this.estateService.editEstateById(userId, estateId, dto);
  }

  @Delete(':id')
  deleteEstateById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) estateId: number,
  ) {
    return this.estateService.deleteEstateById(userId, estateId);
  }
}
