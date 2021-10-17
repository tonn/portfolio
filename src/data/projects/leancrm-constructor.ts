import { IProject } from '..';
import { Assets } from '../../assets.g';

export const LeanCRMConstructorProject: IProject = {
  Title: 'Custom CRM workflow designer',
  Start: new Date(2017, 3),
  End: new Date(2021, 2),
  PrimaryTechs: ['html', 'scss', 'typescript', 'angular'],
  Description: 'My client wanted fully-custom designed graph based constructor for CRM-workflow. System frontend was built on Angular 6.',
  Images: [{
    Filename: Assets.leancrm_constructor.i_a_2019_01_30_scenariy
  }, {
    Filename: Assets.leancrm_constructor.i_a_2018_09_03_spisok_scenariev
  }, {
    Filename: Assets.leancrm_constructor.i_a_2019_01_30_redaktor_zadachi
  }]
}

export const LeanCRMConstructorProjectRu: IProject = {
  ...LeanCRMConstructorProject
}