import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PropertyModule } from './property/property.module';

@Module({
  imports: [AuthModule, UserModule, PropertyModule],
})
export class AppModule {}
