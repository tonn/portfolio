import glob from 'glob';
import fs from 'fs';
import path from 'path';
// import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
// import imageminJpegtran from 'imagemin-jpegtran';
import imagemin from 'imagemin';
import webp from 'webp-converter';
import Jimp from 'jimp';
import PromisePool from '@supercharge/promise-pool';
import _ from 'lodash';
import { normalizeName } from './helpers';
import { prepareFonts } from './prepareFonts';
import { UnicodeRanges } from './prepareFonts/UnicodeRanges';
import { Font } from './prepareFonts/font';

const projectPath = process.cwd();
const assetsSourcesFolder = path.join(projectPath, 'assetsSources');
const assetsFolder = path.join(projectPath, 'public', 'assets.g');
const fontsInfoFilePath = path.join(assetsSourcesFolder, 'fonts.json');

if (!fs.existsSync(assetsFolder)) fs.mkdirSync(assetsFolder);

const Exts = {
    webp: '.webp',
    jpg1: '.jpg',
    jpg2: '.jpeg',
    png: '.png',
    ttf: '.ttf'
}

const ImagesExts = [Exts.jpg1, Exts.jpg2, Exts.png, Exts.webp];

// Оптимизируем все картинки
async function OptimizeAssets$() {
    const items = glob.sync(`${assetsSourcesFolder}/**/*`).filter(f => fs.lstatSync(f).isFile());
    const assets: { filename: string, path: string, project: string }[] = [];
    const fonts: Font[] = fs.existsSync(fontsInfoFilePath) ? JSON.parse(fs.readFileSync(path.join(assetsSourcesFolder, 'fonts.json'), { encoding: 'utf8' })) : [];

    console.dir(items);

    fs.rmdirSync(assetsFolder, { recursive: true });

    await PromisePool.withConcurrency(12).for(items).process(async item => {
        const relativeFilePath = path.relative(assetsSourcesFolder, item);
        const targetFilePath = path.join(assetsFolder, relativeFilePath);
        const targetFolderPath = path.dirname(targetFilePath);
        const filenameExt = path.basename(targetFilePath);
        const fileExt = path.extname(filenameExt);
        const filename = filenameExt.slice(0, -fileExt.length);
        const newFilename = normalizeName(filename);
        let newFilePath = path.join(targetFolderPath, newFilename);

        fs.mkdirSync(targetFolderPath, { recursive: true });

        console.dir([filename, fileExt, ImagesExts.includes(fileExt)]);

        if (ImagesExts.includes(fileExt)) {
            newFilePath += Exts.png;

            if (fileExt === Exts.webp) {
                await webp.dwebp(item, newFilePath, '-o');
            } else if ([Exts.jpg1, Exts.jpg2].includes(fileExt)) {
                const jimpImage = await Jimp.read(item);
                await jimpImage.writeAsync(newFilePath)
            } else if (fileExt === Exts.png) {
                fs.copyFileSync(item, newFilePath);
            } 

            await imagemin([newFilePath], { destination: targetFolderPath, plugins: [imageminPngquant()], glob: false });

            assets.push({ 
                filename: `i_${newFilename.replace(/-/g, '_')}`, 
                path: path.relative(path.join(projectPath, 'public'), newFilePath).replace(/\\/g, '\\\\'), 
                project: path.basename(targetFolderPath).replace(/-/g, '_') 
            });
        } else if (fileExt === Exts.ttf) {
            newFilePath += Exts.ttf;

            let font = fonts.find(f => f.filePath === relativeFilePath);

            if (font) {
                if (!font.skip) {
                    prepareFonts([{ 
                        ...font, 
                        filePath: item, 
                        targetFilePath: newFilePath,
                        runtimeFilePath: path.relative(path.join(projectPath, 'public'), newFilePath).replace(/\\/g, '\\\\')
                    }], path.join(projectPath, 'public'), path.join(projectPath, 'src'));
                }
            } else { 
                font = { 
                    filePath: relativeFilePath, 
                    fontName: newFilename, 
                    style: 'normal', 
                    weight: '500', 
                    unicodes: [UnicodeRanges.All] 
                };
                fonts.push(font);
            }
        } else {
            console.log(`unknown file type ${item}`);
        }
    })

    fs.writeFileSync('src/assets.g.ts', (
`// Generated. DO NOT EDIT. Look at <project>/buildScripts/prepareAssets.ts
export const Assets = {
${_(assets).groupBy(a => a.project).map((values, project) => (
`  ${project}: {
    ${values.map(file => `${file.filename}: '${file.path}'`).join(',\n    ')}
  }`
)).join(',\n')}
}
`));

    fs.writeFileSync(fontsInfoFilePath, JSON.stringify(fonts, undefined, 2));
}

(async function () {
    await OptimizeAssets$();
})();
