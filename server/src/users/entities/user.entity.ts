import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from 'typeorm';
import {ApiProperty} from '@nestjs/swagger';

export enum UserRole {
    ADMIN = 'ADMIN',
    USER = 'USER',
}


@Entity()
export class User {
    @ApiProperty({
        example: 1,
        description: 'Unique id'
    })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        example: 'user@email.ru',
        description: 'Email'
    })
    @Column({ unique: true })
    email: string;

    @ApiProperty({
        example: 'HiThere.12012',
        description: 'Salted password'
    })
    @Column()
    password: string;

    @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
    role: UserRole;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
