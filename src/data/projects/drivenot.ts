import { IProject } from '..'
import { Assets } from '../../assets.g'

export const DriveNotProject: IProject = {
  Title: 'DriveNot Taxi App Prototype',
  Start: new Date(2016, 11),
  End: new Date(2017, 9),
  Technologies: ['html', 'scss', 'typescript', 'angular', 'cordova', 'ios', 'android'],
  Description: 'The customer had mobile ready web site, which he wanted to wrap into cross-platform application. I used Cordova with Ionic 2 for this project. In the result we have "White Label" application. The customer can re-brand app by adding simple template.',
  Images: [{
    Filename: Assets.drivenot.i_a_logo
  }, {
    Filename: Assets.drivenot.i_a_drivenot,
    Description: ''
  }]
}

export const DriveNotProjectRu: IProject = {
  ...DriveNotProject
}