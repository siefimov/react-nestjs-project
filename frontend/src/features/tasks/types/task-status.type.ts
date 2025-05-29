import type { TASK_STATUS } from '../constants';

export type TaskStatus = (typeof TASK_STATUS)[keyof typeof TASK_STATUS];
