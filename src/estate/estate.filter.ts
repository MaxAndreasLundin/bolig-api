import { IsNumber, IsOptional, IsString } from 'class-validator';

class Range {
  @IsOptional()
  @IsNumber()
  gte?: number;

  @IsOptional()
  @IsNumber()
  lte?: number;
}

export class EstateFilter {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  link?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  typeOfResidence?: string;

  @IsOptional()
  @IsString()
  coordinates?: string;

  @IsOptional()
  price?: Range;

  @IsOptional()
  room?: Range;

  @IsOptional()
  area?: Range;

  [key: string]: string | Range | undefined;
}
