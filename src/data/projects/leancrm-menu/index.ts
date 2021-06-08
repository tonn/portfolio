import { IProject } from '../..';
import image1 from './menu1.png';
import image2 from './menu2.png';

export const LeanCRMMenu: IProject = {
  Title: 'Main menu in custom CRM system',
  YearStart: 2015,
  Technologies: ['html', 'scss', 'typescript', 'angular'],
  Description: 'Client wanted a customizable main menu. Menu structure was downloaded from server. Menu had two states - full width and collapsed.',
  Images: [{
    Filename: image1
  }, {
    Filename: image2
  }]
}
