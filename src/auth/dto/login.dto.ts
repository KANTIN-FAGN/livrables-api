import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, IsString, MinLength} from 'class-validator';

export class LoginDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty(
        {example: 'sabin@adams.com'}
    )
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @ApiProperty(
        {example: 'password-sabin'}
    )
    password: string;
}
