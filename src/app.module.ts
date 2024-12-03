import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphqlModule } from './graphql/graphql.module';
import { PrismaModule } from './infra/database/prisma/prisma.module';
import { NotificationModule } from './modules/notification/notification.module';
import { PermissionModule } from './modules/permission/permission.module';
import { ProjectModule } from './modules/project/project.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { UserModule } from './modules/user/user.module';
import { UserTypeModule } from './modules/user-type/user-type.module';

@Module({
  imports: [
    GraphqlModule,
    UserModule,
    PrismaModule,
    ProjectModule,
    TasksModule,
    NotificationModule,
    UserTypeModule,
    PermissionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
