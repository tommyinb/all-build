import { expect } from "chai";
import all from "it-all";
import { stub } from "sinon";

describe("project", function () {
  describe("readProjects", function () {
    it("should read projects correctly", async function () {
      const fs = require("fs/promises");
      const readFile = stub(fs, "readFile").callsFake(async (path, _) => {
        const readPath = path.toString();

        if (readPath.startsWith("a")) {
          return JSON.stringify({
            name: "a",
            dependencies: {
              b: "file:../b",
            },
            devDependencies: {
              c: "file:../c",
            },
          });
        } else if (readPath.startsWith("b")) {
          return JSON.stringify({
            name: "b",
          });
        } else if (readPath.startsWith("c")) {
          return JSON.stringify({
            name: "c",
            dependencies: {
              d: "file:../d",
            },
          });
        } else if (readPath.startsWith("d")) {
          return JSON.stringify({
            name: "d",
          });
        } else {
          throw new Error(`file ${path} is not mocked`);
        }
      });

      const { readProjects } = require("../src/project");
      const projects = await all(readProjects("a"));

      readFile.restore();

      expect(projects).to.eql([
        {
          path: "a",
          name: "a",
          dependencies: [
            { path: "b", name: "b" },
            { path: "c", name: "c" },
          ],
        },
        {
          path: "b",
          name: "b",
          dependencies: [],
        },
        {
          path: "c",
          name: "c",
          dependencies: [{ path: "d", name: "d" }],
        },
        {
          path: "d",
          name: "d",
          dependencies: [],
        },
      ]);
    });
  });

  describe("readProject", function () {
    it("should read package.json", async function () {
      let readPath: string | undefined = undefined;

      const fs = require("fs/promises");
      const readFile = stub(fs, "readFile").callsFake(async (path, _) => {
        readPath = path.toString();

        return JSON.stringify({
          name: "a",
          dependencies: {
            b: "file:../b",
            c: "file:../c",
          },
          devDependencies: {
            d: "file:../d",
            e: "^1.2.3",
          },
        });
      });

      const { readProject } = require("../src/project");
      const project = await readProject("a");

      readFile.restore();

      expect(readPath).not.to.undefined;
      if (readPath) {
        expect(/^a[/\\]package.json$/.test(readPath)).to.true;
      }

      expect(project).to.eql({
        path: "a",
        name: "a",
        dependencies: [
          { path: "b", name: "b" },
          { path: "c", name: "c" },
          { path: "d", name: "d" },
        ],
      });
    });
  });
});
