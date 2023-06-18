import {HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto} from '../users/dto/create-user.dto';
import {UsersService} from '../users/users.service';
import {JwtService} from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import {User} from '../users/entities/user.entity';

@Injectable()
export class AuthService {

  constructor(private userService: UsersService,
              private jwtService: JwtService) {}




  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user)
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email)
    if (candidate) {
      throw new HttpException('User already exist', HttpStatus.BAD_REQUEST)
    }

    const hashPassword = await bcryptjs.hash(userDto.password, 5)

    const user = await this.userService.create({
      ...userDto,
      password: hashPassword
    })

    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = {
      email: user.email,
      id: user.id,
      role: user.role
    }
    return {
      token: this.jwtService.sign(payload)
    }
  }

  private async validateUser(userDto: CreateUserDto){
    const user = await this.userService.getUserByEmail(userDto.email);
    const passwordEquals = await bcryptjs.compare(userDto.password, user.password);
    if(user && passwordEquals) {
      return user;
    }

    throw new UnauthorizedException({message: 'Incorrect email or password'})
  }
}
