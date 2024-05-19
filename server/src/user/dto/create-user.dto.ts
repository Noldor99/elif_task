import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'Nora',
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 255)
  readonly name: string;

  @ApiProperty({
    example: 'simple@gmail.com',
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 255)
  readonly email: string;

  @ApiProperty({
    example: 'Friends',
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 255)
  readonly hear: string;

  @ApiProperty({
    example: '2000-08-16T15:30:00Z',
  })
  @IsNotEmpty()
  @IsISO8601()
  readonly birth: Date;
}
