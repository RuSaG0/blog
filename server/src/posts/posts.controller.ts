import {Controller, Get, Body, Patch, Param, Post, Delete, Query, UseGuards} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {Post as PostEntity } from './entities/post.entity';
import {Roles} from '../auth/roles-auth.decorator';
import {UserRole} from '../users/entities/user.entity';
import {RolesGuard} from '../auth/roles-guard';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({summary: 'Create post'})
  @ApiResponse({status: 200, type: PostEntity})
  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  @ApiOperation({summary: 'get posts'})
  @ApiResponse({status: 200, type: [PostEntity]})
  findAll(@Query('tags') tags: string) {
    return this.postsService.findAll(tags);
  }

  @Get('/tags')
  getAllTags() {
    return this.postsService.getAllTags()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
