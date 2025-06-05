import { Controller, Get, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Get()
  create(@Body() body: any) {
    return this.userService.create(body);
   
  }
   
}
