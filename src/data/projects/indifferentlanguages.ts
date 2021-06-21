import { IProject } from '..';

export const IDLProject: IProject = {
  Title: 'In Different Languages',
  Start: new Date(2020, 3),
  Technologies: ['html', 'scss', 'typescript', 'angular', 'azure', 'mssql', 'c#', 'asp.net', 'entityframework'],
  Description: '',
  Images: [{
    Filename: 'assets/indifferentlanguages/splash.png'
  }, {
    Filename: 'assets/indifferentlanguages/unnamed.webp'
  }, {
    Filename: 'assets/indifferentlanguages/unnamed (1).webp'
  }, {
    Filename: 'assets/indifferentlanguages/unnamed (2).webp'
  }, {
    Filename: 'assets/indifferentlanguages/unnamed (3).webp'
  }]
}

export const IDLProjectRu: IProject = {
  ...IDLProject
}