import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginUserDto, RegisterUserDto } from './dto';
import { JwtGuard } from './jwt.guard';
import { UsersService } from '../users';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Post('register')
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @UseGuards(JwtGuard)
  @Get('me')
  async getProfile(@Req() req) {
    const user = await this.userService.findOne(req.user.userId)
    return { user: {id: user.id, name: user.name, email: user.email } };
  }
}
