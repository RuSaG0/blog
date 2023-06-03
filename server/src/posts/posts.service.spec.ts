import { Test, TestingModule } from '@nestjs/testing';
import {PostsService} from './posts.service';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import {Post} from './entities/post.entity';

describe('PostsService', () => {
  let service: PostsService;
  let repository: Repository<Post>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: getRepositoryToken(Post),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
    repository = module.get<Repository<Post>>(getRepositoryToken(Post));
  });

  describe('create', () => {
    it('should create a post', async () => {
      const createPostDto = {
        header: 'Test Header',
        preview_url: 'http://example.com',
        content: 'Test Content',
        tags: ['tag1', 'tag2'],
      };
      const createdPost = {
        id: 1,
        created_at: new Date(),
        updated_at: new Date(),
        ...createPostDto,
      };

      jest.spyOn(repository, 'create').mockReturnValue(createdPost);
      jest.spyOn(repository, 'save').mockResolvedValue(createdPost);

      const result = await service.create(createPostDto);

      expect(repository.create).toHaveBeenCalledWith(createPostDto);
      expect(repository.save).toHaveBeenCalledWith(createdPost);
      expect(result).toEqual(createdPost);
    });
  });

  describe('findAll', () => {
    it('should return all posts', async () => {
      const tags = 'tag1,tag2';
      const queryBuilder = {
        where: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue([]),
      } as unknown as SelectQueryBuilder<Post>;

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValue(queryBuilder);

      await service.findAll(tags);

      expect(repository.createQueryBuilder).toHaveBeenCalledWith('post');
      expect(queryBuilder.where).toHaveBeenCalledWith('post.tags::text[] && :tags', { tags: ['tag1', 'tag2'] });
      expect(queryBuilder.getMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single post', async () => {
      const postId = 1;
      const post = {
        id: postId,
        header: 'Test Header',
        preview_url: 'http://example.com',
        content: 'Test Content',
        tags: ['tag1', 'tag2'],
        created_at: new Date(),
        updated_at: new Date(),
      };

      jest.spyOn(repository, 'findOne').mockResolvedValue(post);

      const result = await service.findOne(postId);

      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: postId } });
      expect(result).toEqual(post);
    });
    it('should throw an error if post is not found', async () => {
      const postId = 1;

      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      await expect(service.findOne(postId)).rejects.toThrowError(Error);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: postId } });
    });
  });

  describe('update', () => {
    it('should update a post', async () => {
      const postId = 1;
      const updatePostDto = {
        header: 'Updated Header',
        preview_url: 'http://updated-example.com',
        content: 'Updated Content',
        tags: ['updated-tag1', 'updated-tag2'],
      };
      const post = {
        id: postId,
        header: 'Test Header',
        preview_url: 'http://example.com',
        content: 'Test Content',
        tags: ['tag1', 'tag2'],
        created_at: new Date(),
        updated_at: new Date(),
      };

      jest.spyOn(repository, 'findOne').mockResolvedValue(post);
      jest.spyOn(repository, 'save').mockResolvedValue({ ...post, ...updatePostDto });

      const result = await service.update(postId, updatePostDto);

      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: postId } });
      expect(repository.save).toHaveBeenCalledWith({ ...post, ...updatePostDto });
      expect(result).toEqual({ ...post, ...updatePostDto });
    });

    it('should throw an error if post is not found', async () => {
      const postId = 1;
      const updatePostDto = {
        header: 'Updated Header',
        preview_url: 'http://updated-example.com',
        content: 'Updated Content',
        tags: ['updated-tag1', 'updated-tag2'],
      };

      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      await expect(service.update(postId, updatePostDto)).rejects.toThrowError(
          `Post with id ${postId} not found`,
      );

      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: postId } });
    });

  });

  describe('remove', () => {
    it('should remove a post', async () => {
      const postId = 1;
      const post = {
        id: postId,
        header: 'Test Header',
        preview_url: 'http://example.com',
        content: 'Test Content',
        tags: ['tag1', 'tag2'],
        created_at: new Date(),
        updated_at: new Date(),
      };

      jest.spyOn(repository, 'findOne').mockResolvedValue(post);
      jest.spyOn(repository, 'remove').mockResolvedValue(undefined);

      await service.remove(postId);

      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: postId } });
      expect(repository.remove).toHaveBeenCalledWith(post);
    });

    it('should throw an error if post is not found', async () => {
      const postId = 1;

      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      await expect(service.remove(postId)).rejects.toThrowError(
          `Post with id ${postId} not found`,
      );

      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: postId } });
    });
  });

  describe('getAllTags', () => {
    it('should return all unique tags', async () => {
      const query = `
        SELECT DISTINCT UNNEST(tags) AS tag
        FROM post
        WHERE tags IS NOT NULL
      `;
      const tags = ['tag1', 'tag2'];

      jest.spyOn(repository, 'query').mockResolvedValue(tags.map((tag) => ({ tag })));

      const result = await service.getAllTags();

      expect(repository.query).toHaveBeenCalledWith(query);
      expect(result).toEqual(tags);
    });
    it('should return an empty array if there are no tags', async () => {
      const query = `
        SELECT DISTINCT UNNEST(tags) AS tag
        FROM post
        WHERE tags IS NOT NULL
      `;
      const tags = [];

      jest.spyOn(repository, 'query').mockResolvedValue([]);

      const result = await service.getAllTags();

      expect(repository.query).toHaveBeenCalledWith(query);
      expect(result).toEqual(tags);
    });
  });
});