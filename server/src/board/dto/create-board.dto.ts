import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsDate, IsISO8601, Length } from 'class-validator';

export class CreateBoardDto {
  @ApiProperty({
    example: 'Memory',
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 255)
  readonly title: string;

  @ApiProperty({
    example: 'Amber helps clients access liquidity, earn yield, and manage risk across crypto-assets.',
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 255)
  readonly description: string;

  @ApiProperty({
    example: '2024-08-16T15:30:00Z',
  })
  @IsNotEmpty()
  @IsISO8601()
  readonly eventDate: Date;

  @ApiProperty({
    example: 'John Doe',
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 255)
  readonly organizer: string;
}
