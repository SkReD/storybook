import { pathExists } from 'fs-extra';
import { resolve } from 'node:path';

import { exec } from '../utils/exec';
import type { Task } from '../task';

const verdaccioCacheDir = resolve(__dirname, '../../.verdaccio-cache');

export const publish: Task = {
  description: 'Publish the packages of the monorepo to an internal npm server',
  dependsOn: ['compile'],
  async ready() {
    return pathExists(verdaccioCacheDir);
  },
  async run({ codeDir }, { dryRun, debug }) {
    return exec(
      'bun run local-registry --publish',
      { cwd: codeDir },
      {
        startMessage: '📕 Publishing packages',
        errorMessage: '❌ Failed publishing packages',
        dryRun,
        debug,
      }
    );
  },
};
