import { Module } from '@nestjs/common';
import { EstateController } from './estate.controller';
import { EstateService } from './estate.service';

@Module({
  controllers: [EstateController],
  providers: [EstateService],
})
export class EstateModule {}
