import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async cleanDatabase() {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('cleanDatabase is not allowed in production');
    }
    const models = ['user', 'profile', 'meal', 'dailyCheckIn', 'aiInteraction', 'subscription'];
    for (const model of models) {
      const delegate = this[model as keyof PrismaClient] as { deleteMany: () => Promise<unknown> } | undefined;
      if (delegate?.deleteMany) {
        await delegate.deleteMany();
      }
    }
  }
}