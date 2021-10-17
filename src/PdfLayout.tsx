import * as Pdf from '@react-pdf/renderer';
import { ICV, IProject } from './data';
import React from 'react';

// Create styles
const styles = Pdf.StyleSheet.create({
  page: {
    padding: '20mm 15mm 20mm 30mm',
    fontFamily: 'MPR1C'
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
  projectCover: {
    width: '30mm',
    height: 'auto',
    borderRadius: 99999
  },
  projectImages: {
    flexDirection: 'row'
  },
  projectImage: {
    maxWidth: '100%',
    maxHeight: '50mm'
  },
  projectTitle: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});

Pdf.Font.register({
  family: 'MPR1C',
  src: 'assets/fonts/mplusrounded1c/MPLUSRounded1c-Light.ttf'
});

const PdfProject: React.FC<{ Project: IProject }> = ({ Project }) => {
  const cover = Project.Images[0];

  return <Pdf.View key={Project.Title}>
    <Pdf.View style={styles.projectTitle}>
      { cover ? <Pdf.Image src={cover.Filename} style={styles.projectCover} /> : null }
      <Pdf.Text>{Project.Title}</Pdf.Text>
    </Pdf.View>
    <Pdf.Text>{Project.Start.toLocaleDateString()}-{Project.End?.toLocaleDateString() || 'in progress'}</Pdf.Text>
    <Pdf.Text>{Project.Description}</Pdf.Text>
    <Pdf.Text>{Project.PrimaryTechs}</Pdf.Text>
    <Pdf.View style={styles.projectImages}>
      {Project.Images.slice(1).map((i, ii) => <Pdf.View key={ii}>
        <Pdf.Image src={i.Filename} style={styles.projectImage} />
        <Pdf.Text>{i.Description}</Pdf.Text>
      </Pdf.View>)}
    </Pdf.View>
  </Pdf.View>
};

export const PdfLayout: React.FC<{ CV: ICV }> = ({ CV }) => {
  return <Pdf.Document>
    <Pdf.Page style={styles.page}>
      <Pdf.Image src={CV.Photo} style={styles.photo} />
      <Pdf.Text>
        {CV.Introduction}
      </Pdf.Text>
      {CV.Projects.map(p => <PdfProject Project={p} />)}
    </Pdf.Page>
  </Pdf.Document>;
}
