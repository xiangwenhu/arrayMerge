import path from "path";
import fs from "fs";
const DIST_ROOT = path.join(__dirname, "../dist");

function script() {

    if (!fs.existsSync(DIST_ROOT)) {
        return;
    }
    fs.rmSync(DIST_ROOT, {
        recursive: true
    })
}

script();
