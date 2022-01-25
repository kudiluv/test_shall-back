import { Controller, Get } from '@nestjs/common';
import { Auth } from 'src/auth/auth.decorator';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Auth()
  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }
}
