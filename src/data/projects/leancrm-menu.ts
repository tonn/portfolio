import { IProject } from '..';
import { Assets } from '../../assets.g';

export const LeanCRMMenu: IProject = {
  Title: 'LeanCRM - Custom main menu component',
  Start: new Date(2016, 11),
  End: new Date(2016, 11),
  PrimaryTechs: ['html', 'scss/css', 'typescript', 'angular'],
  Description: 'Client wanted a customizable main menu. Menu structure was downloaded from server. Menu had two states - full width and collapsed.',
  Images: [{
    Filename: Assets.leancrm_menu.i_a_menu1,
    Thumb: Assets.leancrm_menu.i_a_menu1_thumb
  }, {
    Filename: Assets.leancrm_menu.i_a_menu2,
    Thumb: Assets.leancrm_menu.i_a_menu2_thumb
  }]
}

export const LeanCRMMenuRu: IProject = {
  ...LeanCRMMenu
}