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

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsInt()
  @Min(1)
  readonly projectId: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  readonly assignedUserId?: number;

  @IsOptional()
  @IsEnum(TaskStatus)
  readonly status?: TaskStatus;
}
