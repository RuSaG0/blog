import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import {ApiProperty} from '@nestjs/swagger';

@Entity()
export class Post {
    @ApiProperty({
        example: 1,
        description: 'unique id'
    })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        example: 'Finite State Machines',
        description: 'header'
    })
    @Column({ length: 128 })
    header: string;

    @Column({ nullable: true })
    preview_url: string;

    @ApiProperty({
        description: 'String in Wysiwyg editor'
    })
    @Column({ length: 65536 })
    content: string;

    @ApiProperty({
        example: '2023-06-02T16:21:20.419Z',
        description: 'Date'
    })
    @CreateDateColumn()
    created_at: Date;

    @ApiProperty({
        example: '2023-06-02T16:21:20.419Z',
        description: 'Date'
    })
    @UpdateDateColumn()
    updated_at: Date;

    @ApiProperty({
        example: ['fsm', 'ai', 'blockchain'],
        description: 'array of tag list'
    })
    @Column( {
        type: 'text',
        array: true,
        nullable: true,
    })
    tags: string[]

    @ApiProperty({
        example: false
    })
    @Column({ nullable: true })
    is_published: boolean;
}
