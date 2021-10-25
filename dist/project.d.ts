export interface Project {
    path: string;
    name: string;
    dependencies: {
        path: string;
        name: string;
    }[];
}
export declare function readProjects(entryPath: string): AsyncGenerator<Project, void, unknown>;
export declare function readProject(projectPath: string): Promise<Project>;
//# sourceMappingURL=project.d.ts.map