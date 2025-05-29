import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator';
import { TaskStatus } from '../task.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ example: 'Task title', maxLength: 100 })
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  readonly title: string;

  @ApiPropertyOptional({ example: 'Task description' })
  @IsOptional()
  @IsString()
  readonly description?: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  readonly projectId: number;

  @ApiPropertyOptional({ example: 2 })
  @IsOptional()
  @IsInt()
  @Min(1)
  readonly assignedUserId?: number;

  @ApiPropertyOptional({ enum: TaskStatus, example: TaskStatus.TODO })
  @IsOptional()
  @IsEnum(TaskStatus)
  readonly status?: TaskStatus;
}
