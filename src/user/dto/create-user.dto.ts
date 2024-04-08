import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { RegExHelper } from 'src/helpers/regex.helper';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Matches(RegExHelper.password)
  password: string;
}
