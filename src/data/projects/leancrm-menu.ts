import { IProject } from '..';

export const LeanCRMMenu: IProject = {
  Title: 'Main menu in custom CRM system',
  Start: new Date(2016, 11),
  End: new Date(2016, 11),
  Technologies: ['html', 'scss', 'typescript', 'angular'],
  Description: 'Client wanted a customizable main menu. Menu structure was downloaded from server. Menu had two states - full width and collapsed.',
  Images: [{
    Filename: 'assets/leancrm-menu/menu1.png'
  }, {
    Filename: 'assets/leancrm-menu/menu2.png'
  }]
}

export const LeanCRMMenuRu: IProject = {
  ...LeanCRMMenu
}