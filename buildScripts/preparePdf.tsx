import process from 'process';
import { CVs } from '../src/data';
import puppeteer from 'puppeteer';
import path from 'path';

const rootFolder = process.cwd();

(async function () {
    const browser = await puppeteer.launch({ headless: true, args:['--allow-file-access-from-files', '--disable-web-security'] });
    const page = await browser.newPage();

    for (const cv of CVs) {
        try {
            await page.goto(`file://${path.resolve(rootFolder, 'build', 'index.html')}?lang=${cv.Language}&grouping`);
            await page.pdf({ 
                path: `${rootFolder}/build/AntonNovikovCV_${cv.Language}.pdf`, 
                format: 'a4',
                margin: { top: '0', bottom: '0', left: '0', right: '0' },
                displayHeaderFooter: true
            });
        } catch (err) {
            console.error(err);
        }
    }
    await browser.close();
})();