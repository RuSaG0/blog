import { IsEmail, IsNotEmpty } from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({
        example: 'user@email.ru',
        description: 'Email'
    })
    @IsEmail({}, { message: 'Invalid email format' })
    @IsNotEmpty({ message: 'Email should not be empty' })
    email: string;

    @ApiProperty({
        example: 'adminadmin',
        description: 'Password'
    })
    @IsNotEmpty({ message: 'Password should not be empty' })
    password: string;
}