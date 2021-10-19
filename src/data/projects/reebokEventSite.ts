import { IProject } from '..';
import { Assets } from '../../assets.g';

export const ReebokEventProject: IProject = {
  Title: 'Reebok Event Site',
  Start: new Date(2016, 5),
  End: new Date(2016, 8),
  PrimaryTechs: ['angularjs', 'javascript', 'scss/css', 'html'],
  Description: '',
  Images: [{
    Filename: Assets.reebokEventSite.i_a_1,
    Thumb: Assets.reebokEventSite.i_a_1_thumb
  }]
}

export const ReebokEventProjectRu: IProject = {
  ...ReebokEventProject
}