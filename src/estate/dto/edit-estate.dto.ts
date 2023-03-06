import { IsNumber, IsOptional, IsString } from 'class-validator';

export class EditEstateDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  link?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsString()
  @IsOptional()
  typeOfResidence?: string;

  @IsString()
  @IsOptional()
  coordinates?: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsNumber()
  @IsOptional()
  room?: number;

  @IsNumber()
  @IsOptional()
  area?: number;
}
