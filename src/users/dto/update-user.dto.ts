import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    name?: string;

    @IsEmail()
    @IsOptional()
    @ApiProperty({ required: false })
    email?: string;

    @IsString()
    @IsOptional()
    @MinLength(6)
    @ApiProperty({ required: false })
    password?: string;
}