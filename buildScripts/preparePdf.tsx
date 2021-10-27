import process from 'process';
import { CVs } from '../src/data';
import puppeteer from 'puppeteer';

const rootFolder = process.cwd();

(async function () {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    for (const cv of CVs) {
        await page.goto(`http://localhost:3001?lang=${cv.Language}`);
        await page.pdf({ 
            path: `${rootFolder}/public/AntonNovikovCV_${cv.Language}.pdf`, 
            format: 'a4',
            margin: { top: '0', bottom: '0', left: '0', right: '0' },
            displayHeaderFooter: true
        });
    }
    await browser.close();
})();