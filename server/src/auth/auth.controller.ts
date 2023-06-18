import {Controller, Get, Post, Body, Patch, Param, Delete, Res} from '@nestjs/common';
import { AuthService } from './auth.service';
import {ApiTags} from '@nestjs/swagger';
import {CreateUserDto} from '../users/dto/create-user.dto';
import {response, Response} from 'express';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body() userDto: CreateUserDto, @Res({passthrough: true}) res: Response) {
    const result = await this.authService.login(userDto);

    res.cookie('RUSAG0-BLOG-TOKEN',  result.access_token, {
      httpOnly: true,
      maxAge: 86400000,
      sameSite: 'none',
      secure: true
    })

    return result;
  }

  @Post('/registration')
  async registration(@Body() userDto: CreateUserDto, @Res(({passthrough: true})) res: Response) {

    const result = await this.authService.registration(userDto)

    res.cookie('RUSAG0-BLOG-TOKEN',  result.access_token, {
      httpOnly: true,
      maxAge: 86400000,
      sameSite: 'none',
      secure: true
    })

    return result;
  }

  @Post('/logout')
  async logout(@Res({passthrough: true}) res: Response) {
    res.clearCookie('RUSAG0-BLOG-TOKEN')
  }
}
