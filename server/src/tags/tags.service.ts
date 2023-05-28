import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Tag} from './entities/tag.entity';
import {Repository} from 'typeorm';

@Injectable()
export class TagsService {

  constructor(
      @InjectRepository(Tag)
      private readonly tagRepository: Repository<Tag>,
  ) {}
  async create(createTagDto: CreateTagDto): Promise<Tag> {
    const tag = this.tagRepository.create(createTagDto);
    return this.tagRepository.save(tag);
  }

  async findAll(): Promise<Tag[]> {
    return this.tagRepository.find();
  }

  async findOne(title: string): Promise<Tag> {
    return await this.tagRepository.findOne({ where: { title } });
  }

  async update(title: string, updateTagDto: UpdateTagDto): Promise<Tag> {
    const tag = await this.tagRepository.findOne({ where: { title } });
    if (!tag) {
      throw new Error(`Tag with title ${title} not found`);
    }
    Object.assign(tag, updateTagDto);
    return this.tagRepository.save(tag);
  }

  async remove(title: string): Promise<void> {
    const tag = await this.tagRepository.findOne({ where: { title } });
    if (!tag) {
      throw new Error(`Tag with title ${title} not found`);
    }
    await this.tagRepository.remove(tag);
  }
}
