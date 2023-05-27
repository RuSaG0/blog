import { IsNotEmpty, IsString, IsOptional, IsUrl, MaxLength } from 'class-validator';

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
}
