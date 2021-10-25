import { exec } from "child_process";

export async function execute(command: string, path: string) {
  return await new Promise<void>((resolve, reject) => {
    exec(command, { cwd: path }, (err, stdout, stderr) => {
      if (err) {
        console.log(`stdout in ${path}`, stdout);

        console.error(`error in ${path}`, err);
        console.error(`stderr in ${path}`, stderr);

        reject(err);
        return;
      }

      resolve();
    });
  });
}
