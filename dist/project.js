"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readProject = exports.readProjects = void 0;
const promises_1 = require("fs/promises");
const lodash_1 = require("lodash");
const path_1 = require("path");
async function* readProjects(entryPath) {
    const returnedPaths = new Set();
    let currentPaths = [entryPath];
    while (currentPaths.length > 0) {
        const currentProjects = [];
        for (const currentPath of currentPaths) {
            const currentProject = await readProject(currentPath);
            yield currentProject;
            currentProjects.push(currentProject);
            returnedPaths.add(currentProject.path);
        }
        currentPaths = currentProjects
            .flatMap((project) => project.dependencies.map((dependency) => dependency.path))
            .filter((path) => !returnedPaths.has(path));
    }
}
exports.readProjects = readProjects;
async function readProject(projectPath) {
    const packagePath = (0, path_1.join)(projectPath, "package.json");
    const packageText = await (0, promises_1.readFile)(packagePath, "utf8");
    const packageJson = JSON.parse(packageText);
    const { name, dependencies: dependenciesMap } = packageJson;
    if (!(0, lodash_1.isString)(name)) {
        throw new Error(`no name text in package in ${projectPath}`);
    }
    const dependencies = Object.entries(dependenciesMap || {})
        .map(([key, value]) => {
        if (!(0, lodash_1.isString)(value)) {
            return undefined;
        }
        if (!value.startsWith("file:")) {
            return undefined;
        }
        const relativePath = value.substring("file:".length);
        const absolutePath = (0, path_1.join)(projectPath, relativePath);
        return {
            path: absolutePath,
            name: key,
        };
    })
        .filter((t) => t !== undefined);
    return {
        path: projectPath,
        name,
        dependencies,
    };
}
exports.readProject = readProject;
//# sourceMappingURL=project.js.map