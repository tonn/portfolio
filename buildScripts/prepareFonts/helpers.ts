import { execSync } from 'child_process';
import * as fs from 'fs';
import * as fse from 'fs-extra';
import path from 'path';

export function pythonEnvRun(command: string, params: { [key: string ]: string | boolean } = {}, cwd?: string) {
  let commandWithParams = command;

  for (let key in params) {
    if (params[key]) {
      if (params[key] === true) {
        commandWithParams += ` ${key}`;
      } else {
        commandWithParams += ` ${key}=${params[key]}`;
      }
    }
  }

  commandWithParams = `${path.join(cwd || '', 'env', 'Scripts', 'activate')} & ${commandWithParams}`

  console.log(commandWithParams);
  execSync(commandWithParams, { stdio: 'inherit' });
}

export function delaySync(time: number) {
  const startTime = Date.now();

  while(true) {
    if ((Date.now() - startTime) >= time) {
      break;
    }
  }
}

export function recreateFolder(path: string) {
  console.log(`Recreating ${path}`);

  while(true) {
    try {
      fse.removeSync(path);
      fs.mkdirSync(path);
      console.log('...OK');
      break;
    } catch {
      console.log('...Error');
      delaySync(1000);
    }
  }  
}