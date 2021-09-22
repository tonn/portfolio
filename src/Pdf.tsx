import { Dialog, DialogTitle, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import * as Pdf from '@react-pdf/renderer';
import React from 'react';
import nameof from 'ts-nameof.macro';
import { ICV } from './data';
import { BEM } from './helpers/BEM';
import './Pdf.scss';
import { PdfLayout } from './PdfLayout';

export const PdfDialog: React.FC<{ open: boolean, closing: () => void, cv: ICV }> = ({ open, closing, cv }) => {
  return (
    <Dialog className={block()} open={open}>
      <DialogTitle className={elem('DialogTitle')}>
        <IconButton className={elem('CloseIcon')} aria-label="Close" onClick={closing}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <div className={elem('Content')}>
        <Pdf.PDFViewer className={elem('PdfView')}>
          <PdfLayout CV={cv} />
        </Pdf.PDFViewer>
      </div>
    </Dialog>
  );
};

const { block, elem } = BEM(nameof(PdfDialog));