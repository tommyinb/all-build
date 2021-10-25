#!/usr/bin/env node

import { build } from "./build";

const command = process.argv[2] || "npx --yes tsc";

const path = process.argv[3] || process.cwd();

build(command, [path]);
