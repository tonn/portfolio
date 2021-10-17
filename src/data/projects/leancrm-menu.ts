import { IProject } from '..';
import { Assets } from '../../assets.g';

export const LeanCRMMenu: IProject = {
  Title: 'Main menu in custom CRM system',
  Start: new Date(2016, 11),
  End: new Date(2016, 11),
  PrimaryTechs: ['html', 'scss', 'typescript', 'angular'],
  Description: 'Client wanted a customizable main menu. Menu structure was downloaded from server. Menu had two states - full width and collapsed.',
  Images: [{
    Filename: Assets.leancrm_menu.i_a_menu1
  }, {
    Filename: Assets.leancrm_menu.i_a_menu2
  }]
}

export const LeanCRMMenuRu: IProject = {
  ...LeanCRMMenu
}