import all from "it-all";
import { uniqBy } from "lodash";
import { execute } from "./execute";
import { getLayers } from "./layer";
import { readProjects } from "./project";

export async function build(command: string, projectPaths: string[]) {
  const pathProjects = await Promise.all(
    projectPaths.map(async (path) => {
      const projects = readProjects(path);
      return await all(projects);
    })
  );

  const projects = uniqBy(
    pathProjects.flatMap((t) => t),
    (project) => `${project.name} ~ ${project.path}`
  );

  const layers = await all(getLayers(projects));

  for (const { index, projects } of layers) {
    console.log(`layer ${index + 1}/${layers.length}`);

    for (const { name, path } of projects) {
      console.log(`build ${name} in ${path}`);

      await execute(command, path);
    }
  }
}
