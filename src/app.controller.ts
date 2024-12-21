import { Controller, Get } from '@nestjs/common';
import { IsPublic } from './aplication/decorator/is-public.decorator';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @IsPublic()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
