import {IsEmail, IsString, Length} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({
        example: 'user@email.ru',
        description: 'Email'
    })
    @IsString({message: 'Email must be string value'})
    @IsEmail({}, {message: 'Incorrect email'})
    email: string;

    @ApiProperty({
        example: 'adminadmin',
        description: 'Password'
    })
    @IsString({message: 'Password must be string value'})
    @Length(6, 16, {message: 'Password length must be between 6 and 16'})
    password: string;
}