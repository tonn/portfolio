import { IProject } from '../..'
import image1 from './images/drivenot.png';
import image2 from './images/logo.png';

export const DriveNotProject: IProject = {
  Title: 'DriveNot Taxi App Prototype',
  Start: new Date(2016, 11),
  End: new Date(2017, 9),
  Technologies: ['html', 'scss', 'typescript', 'angular', 'cordova', 'ios', 'android'],
  Description: 'The customer had mobile ready web site, which he wanted to wrap into cross-platform application. I used Cordova with Ionic 2 for this project. In the result we have "White Label" application. The customer can re-brand app by adding simple template.',
  Images: [{
    Filename: image2
  }, {
    Filename: image1,
    Description: ''
  }]
}

export const DriveNotProjectRu: IProject = {
  ...DriveNotProject
}