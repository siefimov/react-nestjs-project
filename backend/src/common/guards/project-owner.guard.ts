import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ProjectsService } from '../../modules/projects/projects.service';
import { IS_PROJECT_OWNER_KEY } from '../decorators/is-project-owner.decorator';
import { log } from 'console';

@Injectable()
export class ProjectOwnerGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private projectsService: ProjectsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isProjectOwnerRequired = this.reflector.getAllAndOverride<boolean>(
      IS_PROJECT_OWNER_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!isProjectOwnerRequired) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const projectId = request.params.id;

    if (!user || !user.userId) {
      throw new UnauthorizedException('User not authenticated.');
    }

    if (!projectId) {
      throw new Error('Project ID is missing from request parameters.');
    }

    const project = await this.projectsService.findOne(projectId);

    if (!project) {
      throw new UnauthorizedException('Project not found.');
    }

    if (project.ownerId !== user.userId) {
      throw new UnauthorizedException(
        'You do not have permission to perform this action.',
      );
    }

    return true;
  }
}
