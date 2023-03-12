import { User } from '@app/user/decorators/user.decorator';
import { CreateUserDto } from '@app/user/dto/createUser.dto';
import { LoginUserDto } from '@app/user/dto/login.dto';
import { UserResponceInterface } from '@app/user/types/userResponce.interface';
import { UserEntity } from '@app/user/user.entity';
import { UserService } from '@app/user/user.service';
import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('users')
  @UsePipes(new ValidationPipe())
  async createUser(
    @Body('user') createUserDto: CreateUserDto,
  ): Promise<UserResponceInterface> {
    const user = await this.userService.createUser(createUserDto);
    return this.userService.buildUserResponce(user);
  }

  @Post('users/login')
  @UsePipes(new ValidationPipe())
  async login(
    @Body('user') loginUserDto: LoginUserDto,
  ): Promise<UserResponceInterface> {
    const user = await this.userService.login(loginUserDto);
    return this.userService.buildUserResponce(user);
  }

  @Get('user')
  async currentUser(
    @User() user: UserEntity,
    @User('id') currentUserId: number,
  ): Promise<UserResponceInterface> {
    console.log('userId', currentUserId);
    return this.userService.buildUserResponce(user);
  }
}
