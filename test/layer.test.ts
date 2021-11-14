import { expect } from "chai";
import all from "it-all";
import { getLayers } from "../src/layer";
import { Project } from "../src/project";

describe("layer", function () {
  describe("getLayers", function () {
    it("should yield layers of projects", async function () {
      const projectA: Project = { path: "/a", name: "a", dependencies: [] };
      const projectB: Project = { path: "/b", name: "b", dependencies: [] };

      const projectC: Project = {
        path: "/c",
        name: "c",
        dependencies: [projectA],
      };

      const projectD: Project = {
        path: "/d",
        name: "d",
        dependencies: [projectC],
      };

      const projectE: Project = {
        path: "/e",
        name: "e",
        dependencies: [projectB, projectD],
      };

      const projectF: Project = { path: "/f", name: "f", dependencies: [] };

      const layers = await all(
        getLayers([projectA, projectB, projectC, projectD, projectE, projectF])
      );

      expect(layers).to.eql([
        {
          index: 0,
          projects: [projectA, projectB, projectF],
        },
        {
          index: 1,
          projects: [projectC],
        },
        {
          index: 2,
          projects: [projectD],
        },
        {
          index: 3,
          projects: [projectE],
        },
      ]);
    });

    it("should not yield when no projects", async function () {
      const layers = all(getLayers([]));
      expect(layers).to.empty;
    });
  });
});
