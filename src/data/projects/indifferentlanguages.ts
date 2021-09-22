import { IProject } from '..';
import { Assets } from '../../assets.g';

export const IDLProject: IProject = {
  Title: 'In Different Languages',
  Start: new Date(2020, 3),
  Technologies: ['html', 'scss', 'typescript', 'angular', 'azure', 'mssql', 'c#', 'asp.net', 'entityframework'],
  Description: '',
  Images: [{
    Filename: Assets.indifferentlanguages.i_a_splash
  }, {
    Filename: Assets.indifferentlanguages.i_a_unnamed
  }, {
    Filename: Assets.indifferentlanguages.i_a_unnamed_1
  }, {
    Filename: Assets.indifferentlanguages.i_a_unnamed_2
  }, {
    Filename: Assets.indifferentlanguages.i_a_unnamed_3
  }]
}

export const IDLProjectRu: IProject = {
  ...IDLProject
}