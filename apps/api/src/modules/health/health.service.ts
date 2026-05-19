import { Injectable } from '@nestjs/common';

import type { HealthResponseDto } from './dto/health-response.dto';

@Injectable()
export class HealthService {
  getHealth(): HealthResponseDto {
    return {
      service: 'ketovore-api',
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }
}
