import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, UsePipes} from '@nestjs/common';
import {UsersService} from './users.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {User, UserRole} from './entities/user.entity';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {Roles} from '../auth/roles-auth.decorator';
import {RolesGuard} from '../auth/roles-guard';
import {ValidationPipe} from '../pipes/validation.pipe';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({summary: 'Get users'})
  @ApiResponse({status: 200, type: User})
  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
