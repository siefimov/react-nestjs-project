// import type { Task } from "../task";
import type { User } from "../user";

export type Project = {
  id: number;
  title: string;
  description?: string | null;
  ownerId: number;
  owner: User;
  createdAt: string;
  updatedAt: string;
};
