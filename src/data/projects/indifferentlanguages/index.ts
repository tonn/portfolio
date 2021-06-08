import { IProject } from '../..';
import image1 from './images/splash.png';
import image2 from './images/unnamed.webp';
import image3 from './images/unnamed (1).webp';
import image4 from './images/unnamed (2).webp';
import image5 from './images/unnamed (3).webp';


export const IDLProject: IProject = {
  Title: 'In Different Languages',
  Start: new Date(2020, 3),
  Technologies: ['html', 'scss', 'typescript', 'angular', 'azure', 'mssql', 'c#', 'asp.net', 'entityframework'],
  Description: '',
  Images: [{
    Filename: image1
  }, {
    Filename: image2
  }, {
    Filename: image3
  }, {
    Filename: image4
  }, {
    Filename: image5
  }]
}

export const IDLProjectRu: IProject = {
  ...IDLProject
}