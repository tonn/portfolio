import { Dialog, DialogTitle, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import * as Pdf from '@react-pdf/renderer';
import { CVs } from './data';
import { BEM } from './helpers/BEM';
import nameof from 'ts-nameof.macro';
import './Pdf.scss';

// Create styles
const styles = Pdf.StyleSheet.create({
  page: {
    padding: '15mm 15mm 15mm 30mm'
  },
  photo: {
    width: '30mm',
    height: 'auto',
    borderRadius: 99999
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

export const PdfLayout: React.FC = () => {
  const cv = CVs[0];

  return <Pdf.Document>
    <Pdf.Page style={styles.page}>
      <Pdf.Image src={cv.Photo} style={styles.photo} />
      <Pdf.Text>
        {cv.Introduction}
      </Pdf.Text>
      {/* {cv.Projects.map(p => <>
        <Pdf.Text>{p.Title}</Pdf.Text>
        <Pdf.Text>{p.Start.toLocaleDateString()}-{p.End?.toLocaleDateString() || 'in progress'}</Pdf.Text>
        <Pdf.Text>{p.Description}</Pdf.Text>
        <Pdf.Text>{p.Technologies}</Pdf.Text>
        {p.Images.map(i => <>
          <Pdf.Image src={i.Filename} />
          <Pdf.Text>{i.Description}</Pdf.Text>
        </>)}
      </>)} */}

      {/* <Map items={cv.Projects} render={item => (<div>
        
      </div>)}/> */}
    </Pdf.Page>
  </Pdf.Document>;
}

export const PdfDialog: React.FC<{ open: boolean, closing: () => void }> = ({ open, closing }) => {
  return (
    <Dialog className={block()} open={open}>
      <DialogTitle className={elem('DialogTitle')}>
        <IconButton className={elem('CloseIcon')} aria-label="Close" onClick={closing}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <div className={elem('Content')}>
        <Pdf.PDFViewer className={elem('PdfView')}>
          <PdfLayout />
        </Pdf.PDFViewer>
      </div>
    </Dialog>
  );
}

const { block, elem } = BEM(nameof(PdfDialog));
