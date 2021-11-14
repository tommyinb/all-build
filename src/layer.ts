import { difference } from "lodash";
import { Project } from "./project";

export interface Layer {
  index: number;
  projects: Project[];
}

export function* getLayers(projects: Project[]) {
  const returnedPaths = new Set<string>();

  let index = 0;
  let currentProjects = [...projects];

  while (currentProjects.length > 0) {
    const layerProjects = currentProjects.filter((project) => {
      const dependencies = project.dependencies.filter(
        (dependency) => !returnedPaths.has(dependency.path)
      );

      return dependencies.length <= 0;
    });

    if (layerProjects.length <= 0) {
      const projectTexts = currentProjects.map(
        (project) => `${project.name}(${project.path})`
      );
      throw new Error(
        `cannot resolve layers among projects ${projectTexts.join(", ")}`
      );
    }

    const layer: Layer = {
      index: index++,
      projects: layerProjects,
    };
    yield layer;

    for (const layerProject of layerProjects) {
      returnedPaths.add(layerProject.path);
    }

    currentProjects = difference(currentProjects, layerProjects);
  }
}
