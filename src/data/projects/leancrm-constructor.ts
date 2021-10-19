import { IProject } from '..';
import { Assets } from '../../assets.g';

export const LeanCRMConstructorProject: IProject = {
  Title: 'LeanCRM - Business workflow designer based on IDEF0 methodology',
  Start: new Date(2017, 3),
  End: new Date(2021, 2),
  PrimaryTechs: ['html', 'scss/css', 'typescript', 'angular'],
  Description: 'My client wanted fully-custom designed graph based constructor for CRM-workflow. System frontend was built on Angular 6.',
  Images: [{
    Filename: Assets.leancrm_constructor.i_a_2019_01_30_scenariy,
    Thumb: Assets.leancrm_constructor.i_a_2019_01_30_scenariy_thumb
  }, {
    Filename: Assets.leancrm_constructor.i_a_2018_09_03_spisok_scenariev,
    Thumb: Assets.leancrm_constructor.i_a_2018_09_03_spisok_scenariev_thumb
  }, {
    Filename: Assets.leancrm_constructor.i_a_2019_01_30_redaktor_zadachi,
    Thumb: Assets.leancrm_constructor.i_a_2019_01_30_redaktor_zadachi_thumb
  }]
}

export const LeanCRMConstructorProjectRu: IProject = {
  ...LeanCRMConstructorProject
}