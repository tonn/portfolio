import { renderToFile } from '@react-pdf/renderer';
import { PdfLayout } from './src/PdfLayout';
import React from 'react';
import process from 'process';

process.chdir('public');

(async function () {
    await renderToFile(<PdfLayout />, `${__dirname}/public/AntonNovikovCV.pdf`);
})();