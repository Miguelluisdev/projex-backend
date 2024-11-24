import { Module } from '@nestjs/common';
import { join } from 'node:path';

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'graphql/schema.gql'),
      fieldResolverEnhancers: ['guards'],
      introspection: true,
      formatError: (error: GraphQLError) => ({
        statusCode: (error.extensions as any)?.originalError?.statusCode,
        message:
          (error.extensions as any)?.originalError?.message ||
          (error?.extensions as any)?.stacktrace[0] ||
          (error.extensions?.response as any)?.message ||
          error?.message ||
          '-',
        error: (error.extensions as any)?.originalError?.error,
        code: error.extensions?.code || '-',
        meta: (error.extensions as any)?.response?.meta,
        path: error.path,
      }),
      context: ({ req, res }) => ({ req, res, headers: req.headers }),
      
    }),
  ],
})
export class GraphqlModule {}
