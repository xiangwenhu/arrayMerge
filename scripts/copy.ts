import path from "path";
import fs, { existsSync } from "fs";
const SRC_ROOT = path.join(__dirname, "../src");
const DIST_ROOT = path.join(__dirname, "../dist");

function script() {
    const srcRoot = path.join(SRC_ROOT);
    const distRoot = path.join(DIST_ROOT);
    const files = fs.readdirSync(srcRoot);

    if (!fs.existsSync(distRoot)) {
        fs.mkdirSync(distRoot);
    }

    for (let i = 0; i < files.length; i++) {
        const fileName: string = files[i];
        if (!fileName.endsWith(".d.ts")) {
            continue;
        }
        const filePath = path.join(srcRoot, fileName);
        const distPath = path.join(distRoot, fileName);
        if (existsSync(distPath)) {
            fs.unlinkSync(distPath)
        }
        const writeStream = fs.createWriteStream(distPath);
        fs.createReadStream(filePath).pipe(writeStream);
    }
}

// script();
