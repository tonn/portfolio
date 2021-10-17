import { IProject } from '..';
import { Assets } from '../../assets.g';

export const StreetQuestProject: IProject = {
  Title: 'StreetQuest',
  Start: new Date(2016, 1),
  End: new Date(2016, 5),
  PrimaryTechs: ['html', 'scss', 'typescript', 'angular'],
  Description: 'Application was created for one of the \'Quest-In-Reality\' company. I built entirely mobile client for two platforms (Android, iOS). I used client\'s API to work with text and media data. I used camera to scan QR. Application can work offline after data download. Project was finished in 2 month.',
  Images: [{
    Filename: Assets.streetquest.i_a_streetquest
  }]
}

export const StreetQuestProjectRu: IProject = {
  ...StreetQuestProject
}