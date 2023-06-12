import {IsNotEmpty} from 'class-validator';

export class CreateSubscriberDto {
    @IsNotEmpty({ message: 'Email should not be empty' })
    email: string;
}
