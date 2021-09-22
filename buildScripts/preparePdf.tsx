import { renderToFile } from '@react-pdf/renderer';
import { PdfLayout } from '../src/PdfLayout';
import React from 'react';
import process from 'process';
import { CVs } from '../src/data';

const rootFolder = process.cwd();

process.chdir('public');

(async function () {
    for (const cv of CVs) {
        await renderToFile(<PdfLayout CV={cv} />, `${rootFolder}/public/AntonNovikovCV_${cv.Language}.pdf`);
    }
})();