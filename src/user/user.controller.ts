import { ExpressRequestInterface } from '@app/types/expressRequest.interface';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from '@app/user/user.service';
import { CreateUserDto } from '@app/user/dto/createUser.dto';
import { UserResponceInterface } from '@app/user/types/userResponce.interface';
import { LoginUserDto } from '@app/user/dto/login.dto';
import { Request } from 'express';

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
    @Req() request: ExpressRequestInterface,
  ): Promise<UserResponceInterface> {
    return this.userService.buildUserResponce(request.user);
  }
}
