import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import {Tag} from '../../tags/entities/tag.entity';

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 128 })
    header: string;

    @Column({ nullable: true })
    preview_url: string;

    @Column({ length: 65536 })
    content: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToMany(() => Tag, { cascade: true })
    @JoinTable()
    tags: Tag[];
}
