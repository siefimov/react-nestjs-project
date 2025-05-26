import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({ example: 'Project title', maxLength: 100 })
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  title: string;

  @ApiPropertyOptional({ example: 'Project description' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 2 })
  @IsInt()
  @Min(1)
  ownerId: number;
}
