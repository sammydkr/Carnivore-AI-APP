import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import type { Request } from 'express';

export interface RefreshJwtPayload {
  sub: string;
  email: string;
  type: 'refresh';
  tokenId: string;
  iat?: number;
  exp?: number;
}

export interface RefreshJwtUser {
  id: string;
  email: string;
  tokenId: string;
  refreshToken: string;
}

interface RequestWithBody extends Request {
  body: { refreshToken: string };
}

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(private readonly configService: ConfigService) {
    const secret = configService.get<string>('JWT_REFRESH_SECRET');
    if (!secret) {
      throw new Error('JWT_REFRESH_SECRET is not configured');
    }

    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      ignoreExpiration: false,
      secretOrKey: secret,
      passReqToCallback: true,
    });
  }

  async validate(req: RequestWithBody, payload: RefreshJwtPayload) {
    if (payload.type !== 'refresh') {
      throw new UnauthorizedException('Invalid token type');
    }

    const refreshToken = req.body?.refreshToken;
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token missing');
    }

    return { id: payload.sub, email: payload.email, tokenId: payload.tokenId, refreshToken };
  }
}