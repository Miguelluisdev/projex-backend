import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphqlModule } from './graphql/graphql.module';
import { PrismaModule } from './infra/database/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthGuard } from './modules/auth/guard/auth.guard';
import { NotificationModule } from './modules/notification/notification.module';
import { PermissionModule } from './modules/permission/permission.module';
import { ProjectModule } from './modules/project/project.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { UserTypeModule } from './modules/user-type/user-type.module';
import { UserModule } from './modules/user/user.module';
import { MailModule } from './modules/mail/mail.module';

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
    AuthModule,
    MailModule,
    EventEmitterModule.forRoot({
      global: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
