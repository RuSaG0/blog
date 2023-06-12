import { Injectable } from '@nestjs/common';
import {Subscriber} from './entities/subscriber.entity';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {Post} from '../posts/entities/post.entity';

@Injectable()
export class SubscribersService {
  constructor(
      @InjectRepository(Post)
      private readonly subscriberRepository: Repository<Subscriber>,
  ) {}

  async create(email: string): Promise<Subscriber> {
    const subscriber = this.subscriberRepository.create({
      email,
      is_subscribed: true,
    });
    return this.subscriberRepository.save(subscriber);
  }


  findAll() {
    return `This action returns all subscribers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subscriber`;
  }

  async update(id: number, updateSubscriberDto: UpdateSubscriberDto): Promise<Subscriber> {
    const subscriber = await this.subscriberRepository.findOne({ where: { id } });
    if (subscriber) {
      Object.assign(subscriber, updateSubscriberDto);
      return this.subscriberRepository.save(subscriber);
    }
    return null;
  }

  remove(id: number) {
    return `This action removes a #${id} subscriber`;
  }
}
