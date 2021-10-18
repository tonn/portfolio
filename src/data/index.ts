import { Assets } from '../assets.g';
import { AvgustProject, AvgustProjectRu } from './projects/avgust';
import { ClearDotProject, ClearDotProjectRu } from './projects/cleardot';
import { DriveNotProject, DriveNotProjectRu } from './projects/drivenot';
import { IDLProject, IDLProjectRu } from './projects/indifferentlanguages';
import { ISSCargoTrafficProject, ISSCargoTrafficProjectRu } from './projects/ISSCargoTraffic';
import { LeanCRMConstructorProject, LeanCRMConstructorProjectRu } from './projects/leancrm-constructor';
import { LeanCRMMenu, LeanCRMMenuRu } from './projects/leancrm-menu';
import { ReebokEventProject, ReebokEventProjectRu } from './projects/reebokEventSite';
import { StreetQuestProject, StreetQuestProjectRu } from './projects/streetquest';

export type Language = 'ru' | 'en';

export interface IProject {
  Title: string,
  Start: Date,
  End?: Date,
  Position?: string,
  PrimaryTechs: string[],
  SecondaryTechs?: string[],
  Description: string,
  Team?: string,
  Images: {
    Filename: string,
    Thumb?: string,
    Description?: string
  }[],
  Links?: {
    Url?: string,
    GooglePlay?: string,
    AppStore?: string
  }
}

export interface ICV {
  FirstName: string,
  SecondName: string,
  Birthday: Date,
  Language: Language,
  Photo: string,
  Introduction: string,
  Projects: IProject[],
  Contacts: { Link: string, Label?: string, Text: string }[]
}

const enCV: ICV = {
  FirstName: 'Anton',
  SecondName: 'Novikov',
  Birthday: new Date('1988.05.18'),
  Language: 'en',
  Photo: Assets.general.i_a_cv_avatar_square,
  Introduction: `Hi! My name is Anton Novikov. I'm professional full-stack developer with 9 total years of work experience.`,
  Projects: [AvgustProject, ClearDotProject, DriveNotProject, IDLProject, ISSCargoTrafficProject, LeanCRMConstructorProject, LeanCRMMenu, ReebokEventProject, StreetQuestProject],
  Contacts: [
    { Label: 'Mail', Text: 'tonn.post@gmail.com', Link: 'mailto:tonn.post@gmail.com' },
    { Label: 'Skype', Text: 'novikov_a_l', Link: 'skype:novikov_a_l' },
    { Label: 'Telegram', Text: '@mr_tonn', Link: 'https://telegram.me/mr_tonn' },
    { Label: 'Upwork', Text: 'Profile', Link: 'https://www.upwork.com/freelancers/~01bc725c5beb65fcad' },
    { Label: 'Github', Text: 'https://github.com/tonn', Link: 'https://github.com/tonn' },
    { Label: 'Bitbucket', Text: 'https://bitbucket.org/tonn', Link: 'https://bitbucket.org/tonn' }
  ]
}

const ruCV: ICV = {
  ...enCV,
  FirstName: 'Антон',
  SecondName: 'Новиков',
  Language: 'ru',
  Introduction: 'Привет! Я - тыжпрограммист!',
  Projects: [AvgustProjectRu, ClearDotProjectRu, DriveNotProjectRu, IDLProjectRu, ISSCargoTrafficProjectRu, LeanCRMConstructorProjectRu, LeanCRMMenuRu, ReebokEventProjectRu, StreetQuestProjectRu]
}

export const CVs: ICV[] = [enCV, ruCV];