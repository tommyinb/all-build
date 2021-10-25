import { readFile } from "fs/promises";
import { isString } from "lodash";
import { join } from "path";

export interface Project {
  path: string;
  name: string;

  dependencies: {
    path: string;
    name: string;
  }[];
}

export async function* readProjects(entryPath: string) {
  const returnedPaths = new Set<string>();

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
      .flatMap((project) =>
        project.dependencies.map((dependency) => dependency.path)
      )
      .filter((path) => !returnedPaths.has(path));
  }
}

export async function readProject(projectPath: string): Promise<Project> {
  const packagePath = join(projectPath, "package.json");

  const packageText = await readFile(packagePath, "utf8");
  const packageJson = JSON.parse(packageText);

  const {
    name,
    dependencies: dependenciesMap,
    devDependencies: devDependenciesMap,
  } = packageJson;

  if (!isString(name)) {
    throw new Error(`no name text in package in ${projectPath}`);
  }

  const dependencies = Object.entries(dependenciesMap || {})
    .concat(Object.entries(devDependenciesMap || {}))
    .map(([key, value]) => {
      if (!isString(value)) {
        return undefined;
      }

      if (!value.startsWith("file:")) {
        return undefined;
      }

      const relativePath = value.substring("file:".length);
      const absolutePath = join(projectPath, relativePath);

      return {
        path: absolutePath,
        name: key,
      };
    })
    .filter((t): t is { path: string; name: string } => t !== undefined);

  return {
    path: projectPath,
    name,
    dependencies,
  };
}
