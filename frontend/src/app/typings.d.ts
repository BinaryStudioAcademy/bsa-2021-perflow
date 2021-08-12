/* eslint-disable no-var, @typescript-eslint/naming-convention */

declare var process: Process;

interface Process {
  env: Env
}

interface Env {
  FIREBASE_KEY: string;
}

interface GlobalEnvironment {
  process: Process
}
