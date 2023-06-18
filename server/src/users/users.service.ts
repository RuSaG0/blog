import { Injectable, NotFoundException } from '@nestjs/common';
import {User, UserRole} from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
      @InjectRepository(User)
      private readonly userRepository: Repository<User>)
  {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email } = createUserDto;

    const existingUser = await this.userRepository.findOne({ where: { email } });

    if (existingUser) {
      throw new NotFoundException('User with this email already exists');
    }

    const user = this.userRepository.create(createUserDto);
    Object.assign(user, {role: UserRole.USER});
    return this.userRepository.save(user);
  }

  findAll(): Promise<User[]>  {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
