import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

describe('PostsController', () => {
  let controller: PostsController;
  let service: PostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [PostsService],
    }).compile();

    controller = module.get<PostsController>(PostsController);
    service = module.get<PostsService>(PostsService);
  });

  describe('create', () => {
  describe('create', () => {
    it('should create a new post', async () => {
      const createPostDto: CreatePostDto = {
        header: 'Test Post',
        preview_url: 'http://example.com',
        content: 'Test Content',
        tags: ['tag1', 'tag2'],
      };

      const createdPost: Post = {
        id: 1,
        ...createPostDto,
        created_at: new Date(),
        updated_at: new Date(),
        preview_url: '',
        tags: []
      };

      jest.spyOn(service, 'create').mockResolvedValue(createdPost);

      const result = await controller.create(createPostDto);

      expect(service.create).toHaveBeenCalledWith(createPostDto);
      expect(result).toEqual(createdPost);
    });
  });

  describe('findAll', () => {
    it('should return all posts', async () => {
      const tags = 'tag1,tag2';
      const posts: Post[] = [
        {
          id: 1,
          header: 'Test Post 1',
          preview_url: 'http://example.com/1',
          content: 'Test Content 1',
          created_at: new Date(),
          updated_at: new Date(),
          tags: ['tag1'],
        },
        {
          id: 2,
          header: 'Test Post 2',
          preview_url: 'http://example.com/2',
          content: 'Test Content 2',
          created_at: new Date(),
          updated_at: new Date(),
          tags: ['tag2'],
        },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(posts);

      const result = await controller.findAll(tags);

      expect(service.findAll).toHaveBeenCalledWith(tags);
      expect(result).toEqual(posts);
    });
  });

  describe('findOne', () => {
    it('should return the specified post', async () => {
      const postId = '1';
      const post: Post = {
        id: Number(postId),
        header: 'Test Post',
        preview_url: 'http://example.com',
        content: 'Test Content',
        created_at: new Date(),
        updated_at: new Date(),
        tags: ['tag1', 'tag2'],
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(post);

      const result = await controller.findOne(postId);

      expect(service.findOne).toHaveBeenCalledWith(postId);
      expect(result).toEqual(post);
    });

    it('should throw an error if post is not found', async () => {
      const postId = '1';

      jest.spyOn(service, 'findOne').mockResolvedValue(undefined);

      await expect(controller.findOne(postId)).rejects.toThrowError(
          `Post with id ${postId} not found`,
      );

      expect(service.findOne).toHaveBeenCalledWith(postId);
    });
  });

  describe('update', () => {
    it('should update the specified post', async () => {
      const postId = '1';
      const updatePostDto: UpdatePostDto = {
        header: 'Updated Post',
        preview_url: 'http://example.com/updated',
        content: 'Updated Content',
        tags: ['updated'],
      };

      const updatedPost: Post = {
        id: parseInt(postId),
        header: updatePostDto.header,
        preview_url: updatePostDto.preview_url,
        content: updatePostDto.content,
        tags: updatePostDto.tags,
        ...updatePostDto,
        created_at: new Date(),
        updated_at: new Date(),
      };

      jest.spyOn(service, 'update').mockResolvedValue(updatedPost);

      const result = await controller.update(postId, updatePostDto);

      expect(service.update).toHaveBeenCalledWith(postId, updatePostDto);
      expect(result).toEqual(updatedPost);
    });

    it('should throw an error if post is not found', async () => {
      const postId = '1';
      const updatePostDto: UpdatePostDto = {
        header: 'Updated Post',
        preview_url: 'http://example.com/updated',
        content: 'Updated Content',
        tags: ['updated'],
      };

      jest.spyOn(service, 'update').mockRejectedValue(
          new Error(`Post with id ${postId} not found`),
      );

      await expect(controller.update(postId, updatePostDto)).rejects.toThrowError(
          `Post with id ${postId} not found`,
      );

      expect(service.update).toHaveBeenCalledWith(postId, updatePostDto);
    });
  });

  describe('remove', () => {
    it('should remove the specified post', async () => {
      const postId = '1';

      jest.spyOn(service, 'remove').mockResolvedValue(undefined);

      await expect(controller.remove(postId)).resolves.toBeUndefined();

      expect(service.remove).toHaveBeenCalledWith(postId);
    });

    it('should throw an error if post is not found', async () => {
      const postId = '1';

      jest.spyOn(service, 'remove').mockRejectedValue(
          new Error(`Post with id ${postId} not found`),
      );

      await expect(controller.remove(postId)).rejects.toThrowError(
          `Post with id ${postId} not found`,
      );

      expect(service.remove).toHaveBeenCalledWith(postId);
    });
  });
});