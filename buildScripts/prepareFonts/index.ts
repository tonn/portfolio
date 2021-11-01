import { execSync } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';
import { Font } from './font';
import { pythonEnvRun } from './helpers';

const fontTargetFormat = 'woff2';
let initialized = false;

let cssFilePath = 'fonts.g.css';
let htmlPreloadFilePath = 'fonts-preload.g.html';
let scssFilePath = 'fonts.g.scss';

function addCSSFontFace(font: Font) {
  fs.appendFileSync(cssFilePath, 
`@font-face {
  font-family: '${font.fontName}';
  src: url('${font.runtimeFilePath}') format('${fontTargetFormat}');
  font-weight: ${font.weight};
  font-style: ${font.style};
}
`);
}

function addSCSSMixin(font: Font) {
  fs.appendFileSync(scssFilePath, 
`@mixin ${font.fontName}_${font.style}_${font.weight} {
  font-family: ${font.fontName};
  font-weight: ${font.weight};
  font-style: ${font.style};
}
`)
}

function addHTMLPreload(font: Font) {
  fs.appendFileSync(htmlPreloadFilePath, `<link rel="prefetch" as="font" href="${font.runtimeFilePath}" />\n`);
}

export function initFontsFiles(metadataOutputFolderPath: string, scrOutputFolder: string) {
  cssFilePath = path.join(metadataOutputFolderPath, cssFilePath);
  htmlPreloadFilePath = path.join(metadataOutputFolderPath, htmlPreloadFilePath);
  scssFilePath = path.join(scrOutputFolder, scssFilePath);

  console.dir([cssFilePath, htmlPreloadFilePath, scssFilePath]);
  [cssFilePath, htmlPreloadFilePath, scssFilePath].forEach(f => {
    fs.existsSync(f) && fs.unlinkSync(f);
    fs.appendFileSync(f, '');
  });
}

export function prepareFonts(fonts: Font[], metadataOutputFolderPath: string, scrOutputFolder: string) {
  console.log('Start fonts preparing');

  if (!initialized) {
    console.log('Initializing venv');

    execSync('py -3 -m venv env', { cwd: __dirname, stdio: 'inherit' });
    pythonEnvRun(`pip install -r ${__dirname}\\requirements.txt`, undefined, __dirname);

    initFontsFiles(metadataOutputFolderPath, scrOutputFolder);

    initialized = true;
  }

  for (const font of fonts) {
    try {
      const source = font.filePath;

      pythonEnvRun(`pyftsubset ${source}`, {
        '--ignore-missing-glyphs': true,
        //'--passthrough-tables': true,
        '--no-subset-tables+=FFTM': true,
        '--with-zopfli': true,
        '--flavor': `${fontTargetFormat}`,
        '--output-file': `"${font.targetFilePath}"`,
        '--unicodes': font.unicodes ? `"${font.unicodes.join(',')}"` : false,
        '--text': font.text ? `"${font.text.join('')}"` : false,
      }, __dirname);

      addCSSFontFace(font);
      addHTMLPreload(font);
      addSCSSMixin(font);
    } catch {}
  }
}