"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = void 0;
const it_all_1 = __importDefault(require("it-all"));
const execute_1 = require("./execute");
const layer_1 = require("./layer");
const project_1 = require("./project");
async function build(command, projectPaths) {
    const pathProjects = await Promise.all(projectPaths.map(async (path) => {
        const projects = (0, project_1.readProjects)(path);
        return await (0, it_all_1.default)(projects);
    }));
    const projects = pathProjects.flatMap((t) => t);
    const layers = await (0, it_all_1.default)((0, layer_1.getLayers)(projects));
    for (const { index, projects } of layers) {
        console.log(`layer ${index + 1}/${layers.length}`);
        for (const { name, path } of projects) {
            console.log(`build ${name} in ${path}`);
            await (0, execute_1.execute)(command, path);
        }
    }
}
exports.build = build;
//# sourceMappingURL=build.js.map