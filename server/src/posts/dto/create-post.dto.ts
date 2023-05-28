import { IsNotEmpty, IsString, IsOptional, IsUrl, MaxLength, IsNumber } from 'class-validator';
import {CreateTagDto} from '../../tags/dto/create-tag.dto';

export class CreatePostDto {
    @IsNotEmpty()
    @IsString()
    header: string;

    @IsOptional()
    @IsUrl()
    preview_url?: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(65536)
    content: string;

    @IsOptional()
    @IsNumber({}, { each: true })
    tags?: CreateTagDto[];
}
