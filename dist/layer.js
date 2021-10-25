"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLayers = void 0;
const lodash_1 = require("lodash");
function* getLayers(projects) {
    const returnedPaths = new Set();
    let index = 0;
    let currentProjects = [...projects];
    while (currentProjects.length > 0) {
        const layerProjects = currentProjects.filter((project) => {
            const dependencies = project.dependencies.filter((dependency) => !returnedPaths.has(dependency.path));
            return dependencies.length <= 0;
        });
        if (layerProjects.length <= 0) {
            const projectTexts = currentProjects.map((project) => `${project.name}(${project.path})`);
            throw new Error(`cannot resolve layers among projects ${projectTexts.join(", ")}`);
        }
        const layer = {
            index: index++,
            projects: layerProjects,
        };
        yield layer;
        for (const layerProject of layerProjects) {
            returnedPaths.add(layerProject.path);
        }
        currentProjects = (0, lodash_1.difference)(currentProjects, layerProjects);
    }
}
exports.getLayers = getLayers;
//# sourceMappingURL=layer.js.map