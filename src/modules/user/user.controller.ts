import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';
import type { RequestWithUser } from 'src/shared/types/request-with-user';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Request() req: RequestWithUser) {
    return this.userService.findById(req.user.userId);
  }
}
