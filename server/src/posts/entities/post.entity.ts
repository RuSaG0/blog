import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

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

    @Column( {
        type: 'text',
        array: true,
        nullable: true,
    })
    tags: string[]

    @Column({ nullable: true })
    is_published: boolean;
}
