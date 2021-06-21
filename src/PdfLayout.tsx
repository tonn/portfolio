import * as Pdf from '@react-pdf/renderer';
import { CVs, IProject } from './data';
import React from 'react';

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
