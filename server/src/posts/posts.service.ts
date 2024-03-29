import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {

  constructor(
      @InjectRepository(Post)
      private readonly postRepository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const post = this.postRepository.create(createPostDto);
    return this.postRepository.save(post);
  }

  async findAll(tags?: string): Promise<Post[]> {
    let query = this.postRepository.createQueryBuilder('post');

    if (tags) {
      const tagArray = tags.split(',');
      query = query.where('post.tags::text[] && :tags', {
        tags: tagArray
      });
    }

    return query.getMany();
  }

  async findOne(id: number): Promise<Post> {
    return this.postRepository.findOne({ where: { id } });
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    const post = await this.postRepository.findOne({ where: { id } });
    if (!post) {
      throw new Error(`Post with id ${id} not found`);
    }
    Object.assign(post, updatePostDto);
    return this.postRepository.save(post);
  }

  async remove(id: number): Promise<void> {
    const post = await this.postRepository.findOne({ where: { id } });
    if (!post) {
      throw new Error(`Post with id ${id} not found`);
    }
    await this.postRepository.remove(post);
  }

  async getAllTags(): Promise<string[]> {
      const query = `
        SELECT DISTINCT UNNEST(tags) AS tag
        FROM post
        WHERE tags IS NOT NULL
        ORDER BY tag
      `;

      const result = await this.postRepository.query(query);

      const tags = result.map((row) => row.tag);

      return tags;
    }
}
