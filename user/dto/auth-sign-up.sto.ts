import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class AuthSignUpDto {
  
  @ApiProperty() firstname: string;
  @ApiProperty() lastname: string;  
  
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty() password: string;
}
