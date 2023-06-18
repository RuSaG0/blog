import {HttpException, HttpStatus, Injectable, NotFoundException, Res, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto} from '../users/dto/create-user.dto';
import {UsersService} from '../users/users.service';
import {JwtService} from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import {User} from '../users/entities/user.entity';

@Injectable()
export class AuthService {

  constructor(private userService: UsersService,
              private jwtService: JwtService) {}

  async login(userDto: CreateUserDto): Promise<User & {access_token: string}> {
    const user = await this.validateUser(userDto);
    const token = await this.generateToken(user);

    return {
      ...user,
      ...token
    };
  }

  async registration(userDto: CreateUserDto): Promise<User & {access_token: string}> {
    const candidate = await this.userService.getUserByEmail(userDto.email)
    if (candidate) {
      throw new HttpException('User already exist', HttpStatus.BAD_REQUEST)
    }

    const hashPassword = await bcryptjs.hash(userDto.password, 5)

    const user = await this.userService.create({
      ...userDto,
      password: hashPassword
    })

    const token = await this.generateToken(user);

    return {
      ...user,
      ...token
    };
  }

  private async generateToken(user: User) {
    const payload = {
      email: user.email,
      id: user.id,
      role: user.role
    }
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      access_token: accessToken
    }
  }

  private async validateUser(userDto: CreateUserDto){
    const user = await this.userService.getUserByEmail(userDto.email);

    if(!user) {
      throw new UnauthorizedException({message: 'Incorrect email or password'})
    }

    const passwordEquals = await bcryptjs.compare(userDto.password, user.password);

    if (passwordEquals) {
      return user;
    }

    throw new HttpException('Unexpected Error', HttpStatus.BAD_REQUEST);
  }
}
