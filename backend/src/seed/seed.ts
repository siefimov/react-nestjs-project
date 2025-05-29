import * as bcrypt from 'bcryptjs';
import { User } from '../modules/users';
import { Project } from '../modules/projects/project.entity';
import { Task, TaskStatus } from '../modules/tasks/task.entity';
import { dataSource } from '../data-source';

async function seed() {
  await dataSource.initialize();

  let user = await dataSource.manager.findOne(User, {
    where: { email: 'admin@example.com' },
  });
  if (!user) {
    const passwordHash = await bcrypt.hash('password123', 10);
    user = dataSource.manager.create(User, {
      name: 'Admin User',
      email: 'admin@example.com',
      password: passwordHash,
    });
    await dataSource.manager.save(user);
  }

  const project = dataSource.manager.create(Project, {
    title: 'Demo Project',
    description: 'This is a demo project',
    ownerId: user.id,
  });
  await dataSource.manager.save(project);

  const tasks = Array.from({ length: 10 }, (_, i) =>
    dataSource.manager.create(Task, {
      title: `Task #${i + 1}`,
      description: `This is task number ${i + 1}`,
      projectId: project.id,
      assignedUserId: user.id,
      status: TaskStatus.TODO,
    }),
  );
  await dataSource.manager.save(tasks);

  console.log('Seed data inserted!');
  await dataSource.destroy();
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
