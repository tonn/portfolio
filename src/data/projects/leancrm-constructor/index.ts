import { IProject } from '../..';
import image1 from './2019-01-30 Сценарий.png';
import image2 from './2018-09-03 Список сценариев.png';
import image3 from './2019-01-30 Редактор задачи.png';

export const LeanCRMConstructorProject: IProject = {
  Title: 'Custom CRM workflow designer',
  YearStart: 2016,
  Technologies: ['html', 'scss', 'typescript', 'angular'],
  Description: 'My client wanted fully-custom designed graph based constructor for CRM-workflow. System frontend was built on Angular 6.',
  Images: [{
    Filename: image1
  }, {
    Filename: image2,
  }, {
    Filename: image3
  }]
}
