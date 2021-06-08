import { IProject } from '../..';
import image1 from './images/streetquest.png';

export const StreetQuestProject: IProject = {
  Title: 'StreetQuest',
  Start: new Date(2016, 1),
  End: new Date(2016, 5),
  Technologies: ['html', 'scss', 'typescript', 'angular'],
  Description: 'Application was created for one of the \'Quest-In-Reality\' company. I built entirely mobile client for two platforms (Android, iOS). I used client\'s API to work with text and media data. I used camera to scan QR. Application can work offline after data download. Project was finished in 2 month.',
  Images: [{
    Filename: image1
  }]
}

export const StreetQuestProjectRu: IProject = {
  ...StreetQuestProject
}