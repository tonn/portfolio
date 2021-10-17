import { IProject } from '..';
import { Assets } from '../../assets.g';

export const IDLProject: IProject = {
  Title: 'In Different Languages',
  Start: new Date(2020, 3),
  PrimaryTechs: ['html', 'scss', 'typescript', 'react', 'ionic', 'capacitor', 'appium', 'webdriverio', 'jest'],
  SecondaryTechs: ['ios', 'android'],
  Description: `It is a dictionary app for people how learns several languages simultaneously. I started it from scratch with using Ionic Capacitor and React (ts/scss).
  Hardest part of the project - asynchronous UI for downloading dictionaries. Users can download dictionaries to work with it without internet connection. Downloading process is very reliable. In case of connection error the app retries download broken chunk of data several times. The app can pause downloading process at any time and continue it when it is possible. Users can use the app during downloading process.
  E2E tests is implemented for part of user cases. It was done with appium, webdriver.io and jest.`,
  Team: 'Me and one more backend developer',
  Images: [{
    Filename: Assets.indifferentlanguages.i_a_splash
  }, {
    Filename: Assets.indifferentlanguages.i_a_unnamed
  }, {
    Filename: Assets.indifferentlanguages.i_a_unnamed_1
  }, {
    Filename: Assets.indifferentlanguages.i_a_unnamed_2
  }, {
    Filename: Assets.indifferentlanguages.i_a_unnamed_3
  }]
}

export const IDLProjectRu: IProject = {
  ...IDLProject
}