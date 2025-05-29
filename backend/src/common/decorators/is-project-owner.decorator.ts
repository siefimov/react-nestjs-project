import { SetMetadata } from '@nestjs/common';

export const IS_PROJECT_OWNER_KEY = 'isProjectOwner';
export const IsProjectOwner = () => SetMetadata(IS_PROJECT_OWNER_KEY, true);
``