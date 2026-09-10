import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';
import { randomUUID } from 'crypto';
import { PrismaService } from '../../database/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { TokensResponseDto } from './dto/tokens-response.dto';
import { RefreshJwtPayload } from './strategies/refresh-jwt.strategy';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(dto: RegisterDto): Promise<TokensResponseDto> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    const passwordHash = await argon2.hash(dto.password);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        passwordHash,
        profile: dto.displayName
          ? { create: { displayName: dto.displayName } }
          : undefined,
        subscription: { create: { status: 'inactive', plan: 'free' } },
      },
      include: { profile: true },
    });

    return this.generateTokens(user.id, user.email);
  }

  async login(dto: LoginDto): Promise<TokensResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordValid = await argon2.verify(user.passwordHash, dto.password);
    if (!passwordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateTokens(user.id, user.email);
  }

  async refresh(userId: string, email: string, tokenId: string): Promise<TokensResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return this.generateTokens(user.id, user.email, tokenId);
  }

  async logout(userId: string, tokenId: string): Promise<void> {
    // In a production app, you'd store refresh tokens in DB with tokenId
    // and revoke them here. For now, client-side deletion is sufficient.
    // TODO: Add refresh token revocation list in database
  }

  private generateTokens(userId: string, email: string, tokenId?: string): TokensResponseDto {
    const accessSecret = this.configService.get<string>('JWT_ACCESS_SECRET')!;
    const refreshSecret = this.configService.get<string>('JWT_REFRESH_SECRET')!;

    const accessToken = this.jwtService.sign(
      { sub: userId, email, type: 'access' },
      { secret: accessSecret, expiresIn: '15m' },
    );

    const refreshTokenId = tokenId ?? randomUUID();
    const refreshToken = this.jwtService.sign(
      { sub: userId, email, type: 'refresh', tokenId: refreshTokenId },
      { secret: refreshSecret, expiresIn: '7d' },
    );

    return {
      accessToken,
      refreshToken,
      tokenType: 'Bearer',
      expiresIn: 900, // 15 minutes in seconds
    };
  }
}