import { IProject } from '..';

export const LeanCRMConstructorProject: IProject = {
  Title: 'Custom CRM workflow designer',
  Start: new Date(2017, 3),
  //End: new Date(2016, ),
  Technologies: ['html', 'scss', 'typescript', 'angular'],
  Description: 'My client wanted fully-custom designed graph based constructor for CRM-workflow. System frontend was built on Angular 6.',
  Images: [{
    Filename: 'assets/leancrm-constructor/2019-01-30 Сценарий.png'
  }, {
    Filename: 'assets/leancrm-constructor/2018-09-03 Список сценариев.png',
  }, {
    Filename: 'assets/leancrm-constructor/2019-01-30 Редактор задачи.png'
  }]
}

export const LeanCRMConstructorProjectRu: IProject = {
  ...LeanCRMConstructorProject
}