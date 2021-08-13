/* eslint-disable no-var */

declare var process:Process;

interface Process{
  env: Env
}

interface Env{
  // eslint-disable-next-line @typescript-eslint/naming-convention
  FIREBASE_KEY: string;
  apiKey: string;
}

interface GlobalEnvironment{
  process: Process
}
