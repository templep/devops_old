import { Controller, Get } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async hello(){
    return "Bienvenue Bro"
  }
  @Get("/pub")
  async publishEvent() {
    this.appService.publishEvent();
  }


}
