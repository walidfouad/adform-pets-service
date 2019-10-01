import fs from 'fs';
import p from 'path';
const appRoot = require('app-root-path');

const mdir = (path) => {
    return fs.existsSync(path) || fs.mkdirSync(path);
};

const projectPath = (dir) => {
    return p.join(appRoot.path, dir);
};

const pathJoin = (path, dir) => {
    return p.join(path, dir);
};

export { mdir, projectPath, pathJoin };