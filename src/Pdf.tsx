import { Button, Dialog, DialogTitle, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import * as Pdf from '@react-pdf/renderer';
import { CVs, ICV, IProject } from './data';
import { BEM } from './helpers/BEM';
import nameof from 'ts-nameof.macro';
import './Pdf.scss';
import jsPDF from 'jspdf';

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
  },
  porjectCover: {
    width: '30mm',
    height: 'auto',
    borderRadius: 99999
  },
  projectTitle: {
    flexDirection: 'row'
  }
});

const PdfProject: React.FC<{ Project: IProject }> = ({ Project }) => {
  const cover = Project.Images[0];

  return <Pdf.View key={Project.Title}>
    <Pdf.View style={styles.projectTitle}>
      { cover ? <Pdf.Image src={cover.Filename} style={styles.porjectCover} /> : null }
      <Pdf.Text>{Project.Title}</Pdf.Text>
    </Pdf.View>
    <Pdf.Text>{Project.Start.toLocaleDateString()}-{Project.End?.toLocaleDateString() || 'in progress'}</Pdf.Text>
    <Pdf.Text>{Project.Description}</Pdf.Text>
    <Pdf.Text>{Project.Technologies}</Pdf.Text>
    {Project.Images.slice(1).map((i, ii) => <Pdf.View key={ii}>
      <Pdf.Image src={i.Filename} />
      <Pdf.Text>{i.Description}</Pdf.Text>
    </Pdf.View>)}
  </Pdf.View>
};

export const PdfLayout: React.FC = () => {
  const cv = CVs[0];

  return <Pdf.Document>
    <Pdf.Page style={styles.page}>
      <Pdf.Image src={cv.Photo} style={styles.photo} />
      <Pdf.Text>
        {cv.Introduction}
      </Pdf.Text>
      {cv.Projects.map(p => <PdfProject Project={p} />)}
    </Pdf.Page>
  </Pdf.Document>;
}

export const LazyDownloadPDFButton: React.FC = () => {
  return <Button
    onClick={async () => {
      // const doc = <PdfLayout />;
      // const asPdf = Pdf.pdf(); // {} is important, throws without an argument
      // asPdf.updateContainer(doc);
      // const blob = await asPdf.toBlob();
      
      // const fileURL = window.URL.createObjectURL(blob);
      // const tab = window.open();

      // if (tab) {
      //   tab.location.href = fileURL;
      // }

      // saveAs(blob, 'document.pdf');
    }}
  >Download PDF</Button>
};

export const PdfDialog: React.FC<{ open: boolean, closing: () => void }> = ({ open, closing }) => {
  return (
    <Dialog className={block()} open={open}>
      <DialogTitle className={elem('DialogTitle')}>
        <LazyDownloadPDFButton />

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
};

const { block, elem } = BEM(nameof(PdfDialog));

export const DownloadPdfButton: React.FC<{ cv: ICV }> = ({ children, cv }) => {
  function onClick() {
    const pdf = new jsPDF();

    pdf.addImage(cv.Photo, 'PNG', 50, 50, 50, 50);

    pdf.output('pdfobjectnewwindow');
  }

  return <Button onClick={onClick}>{children}</Button>
}