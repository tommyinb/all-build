#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const build_1 = require("./build");
const [_path, _script, ...parts] = process.argv;
const command = parts.length > 0 ? parts.join(" ") : "npm run build";
const path = process.cwd();
(0, build_1.build)(command, [path]);
//# sourceMappingURL=cli.js.map