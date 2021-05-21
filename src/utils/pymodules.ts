import { spawn } from 'child_process';
import { PYMODULE_MAIN } from '@constants';

const module_process = spawn('python3', [PYMODULE_MAIN]);
let activeListener: (data: string) => void;

const processFile = (from: string, to: string): Promise<void> => {
  console.log(from, to);
  module_process.stdin.write(`${from}:${to}\n`);
  
  return new Promise((resolve, reject) => {
    activeListener = (data: string) => {
      if (data.toString() === 'success\n') {
        resolve();
      } else {
        reject();
      }
    };
  });
};

module_process.stdout.on('data', (data: string) => {
  console.log(`Python module response: ${data.toString().replace('\n', '')}`);
  activeListener(data);
});

module_process.on('exit', (err: Error) => {
  console.error(`Python module error code: ${err}\nScript path: ${PYMODULE_MAIN}`);
  module_process.kill();
  process.exit();
})

export default processFile;
