declare let process:Process;

interface Process{
  env:Env
}
interface Env{
  apiKey:string;
}
interface GlobalEnvironment{
  process:Process
}
