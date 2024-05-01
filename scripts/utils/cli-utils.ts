import { spawn } from 'node:child_process';
import { join } from 'node:path';
import { existsSync } from 'node:fs';

const logger = console;

export const checkDependencies = async () => {
  const scriptsPath = join(__dirname, '..');
  const codePath = join(__dirname, '..', '..', 'code');

  const tasks: Array<any> = [];

  if (!existsSync(join(scriptsPath, 'node_modules'))) {
    tasks.push(
      spawn('bun', ['install'], {
        cwd: scriptsPath,
        shell: true,
        stdio: ['inherit', 'inherit', 'inherit'],
      })
    );
  }
  if (!existsSync(join(codePath, 'node_modules'))) {
    tasks.push(
      spawn('bun', ['install'], {
        cwd: codePath,
        shell: true,
        stdio: ['inherit', 'inherit', 'inherit'],
      })
    );
  }

  if (tasks.length > 0) {
    logger.log('installing dependencies');

    await Promise.all(
      tasks.map(
        (t) =>
          new Promise<void>((res, rej) => {
            t.on('exit', (code: number) => {
              if (code !== 0) {
                rej();
              } else {
                res();
              }
            });
          })
      )
    ).catch(() => {
      tasks.forEach((t) => t.kill());
      throw new Error('Failed to install dependencies');
    });

    // give the filesystem some time
    await new Promise((res) => {
      setTimeout(res, 1000);
    });
  }
};
