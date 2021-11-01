import { Controller, Get, Header } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  // dependency injection
  constructor(private readonly appService: AppService) {}

  // decorators used to set configurations for nextjs
  @Get()
  @Header('Content-Type', 'text/html')
  getHello(): { name: string } {
    return this.appService.getHello();
  }
}
