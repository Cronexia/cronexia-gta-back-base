// * 🌐 GraphQL
import { Module } from '@nestjs/common';
import { HelloResolver } from './hello.resolver';

@Module({
  imports: [],
  exports: [HelloResolver],
  controllers: [],
  providers: [HelloResolver], //< This
})
export class HelloModule {}
