#!/usr/bin/env node

import { build } from "./build";

const [_path, _script, ...parts] = process.argv;
const command = parts.length > 0 ? parts.join(" ") : "npm run build";

const path = process.cwd();

build(command, [path]);
