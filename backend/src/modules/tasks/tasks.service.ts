import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async create(tasksRepository: CreateTaskDto): Promise<Task> {
    const task = this.tasksRepository.create(tasksRepository);
    return this.tasksRepository.save(task);
  }

  async findAll(
    projectId?: number,
    status?: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<{ tasks: Task[]; total: number }> {
    const where: any = {};
    if (projectId) {
      where.projectId = projectId;
    }

    if (status) {
      where.status = status;
    }
    const [tasks, total] = await this.tasksRepository.findAndCount({
      where,
      skip: (page - 1) * limit,
      take: limit,
    });

    return { tasks, total };
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.tasksRepository.findOneBy({ id });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    await this.tasksRepository.update(id, updateTaskDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.tasksRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }
}
