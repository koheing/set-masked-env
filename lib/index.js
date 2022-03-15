"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@actions/core");
const fs_1 = require("fs");
const util_1 = require("util");
const readFileAsync = (0, util_1.promisify)(fs_1.readFile);
async function main() {
    try {
        const path = (0, core_1.getInput)('path');
        const source = await readFileAsync(path, { encoding: 'utf8' });
        const lines = source.split('\n');
        lines
            .filter((it) => it.length > 0)
            .forEach((line) => {
            const [variable, value] = line.split('=');
            // setSecret(value)
            (0, core_1.exportVariable)(variable, value);
        });
    }
    catch (e) {
        (0, core_1.setFailed)(e);
    }
}
main();
