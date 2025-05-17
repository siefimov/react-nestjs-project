import { IsString, IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
}
