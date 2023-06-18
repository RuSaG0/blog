import {Controller, Get, Body, Patch, Param, Post, Delete, Query} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {Post as PostEntity } from './entities/post.entity';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({summary: 'Create user'})
  @ApiResponse({status: 200, type: PostEntity})
  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
