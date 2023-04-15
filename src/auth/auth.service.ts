import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import { SignTokenPayload, AccessTokenResponse } from './types';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: AuthDto): Promise<AccessTokenResponse> {
    const hash: string = await argon.hash(dto.password);

    try {
      const user: User = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
          firstName: dto.firstName,
          lastName: dto.lastName,
        },
      });

      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }

  async signin(dto: AuthDto): Promise<AccessTokenResponse> {
    const user: User | null = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) throw new ForbiddenException('Invalid credentials');

    const pwMatches: boolean = await argon.verify(user.hash, dto.password);

    if (!pwMatches) throw new ForbiddenException('Invalid credentials');

    return this.signToken(user.id, user.email);
  }

  async signToken(userId: number, email: string): Promise<AccessTokenResponse> {
    const payload: SignTokenPayload = {
      sub: userId,
      email,
    };

    const secret = this.config.get('JWT_SECRET');

    const token: string = await this.jwt.signAsync(payload, {
      expiresIn: '150m',
      secret: secret,
    });

    return { access_token: token };
  }
}
