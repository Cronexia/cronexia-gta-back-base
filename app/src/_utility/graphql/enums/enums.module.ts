import { Module } from '@nestjs/common';
import { registerEnumType } from '@nestjs/graphql';
import { OrderByEnum } from './order-by.enum';

@Module({})
export class ENUMsModule {
  constructor() {
    registerEnumType(OrderByEnum, {
      name: 'OrderByEnum',
      description: '🔀 Used for sorting (orderBy). asc or desc.',
      valuesMap: {
        asc: {
          description: '⬆️ Sort ascending (A → Z)',
        },
        desc: {
          description: '⬇️ Sort descending (Z → A)',
        },
      },
    });
  }
}
