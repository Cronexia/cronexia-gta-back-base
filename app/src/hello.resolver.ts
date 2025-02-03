// * 🌐 GraphQL
import { Resolver, Query } from '@nestjs/graphql';

@Resolver()
export class HelloResolver {
  @Query(() => String)
  async sayHello(): Promise<string> {
    return `Hello World!`;
  }
}
