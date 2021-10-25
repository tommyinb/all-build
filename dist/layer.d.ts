import { Project } from "./project";
export interface Layer {
    index: number;
    projects: Project[];
}
export declare function getLayers(projects: Project[]): Generator<Layer, void, unknown>;
//# sourceMappingURL=layer.d.ts.map