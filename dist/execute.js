"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = void 0;
const child_process_1 = require("child_process");
async function execute(command, path) {
    return await new Promise((resolve, reject) => {
        (0, child_process_1.exec)(command, { cwd: path }, (err, stdout, stderr) => {
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
exports.execute = execute;
//# sourceMappingURL=execute.js.map