import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  token: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  password: string;
}
