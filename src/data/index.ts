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
  Technologies: string[],
  Description: string,
  Images: {
    Filename: string,
    Description?: string
  }[],
  Links?: {
    Url?: string,
    GooglePlay?: string,
    AppStore?: string
  }
}

export interface ICV {
  Language: Language,
  Introduction: string,
  Projects: IProject[]
}

export const CVs: ICV[] = [{
  Language: 'en',
  Introduction: 'Hi! I\'m professional full-stack developer with 9 total years of work experience.\n\nMy main experience by technologies:\nC#/Entity Framework/WCF/WinForms/DevExpress: 6 years\nASP.net/WebAPI/Owin: 2 years\nHTML5/JS/CSS/SCSS/Angular 1: 4 years\nCordova/PhoneGap/Ionic/Android/iOS: 3 years\nTypeScript/Angular 2+/Ionic 2: 3 year\nAdditional experience in Nuget, NodeJS/NPM, Gulp, T4 template, XSLT, C++/Qt, python\n\nStrong in Git (usually I use git-flow).\n\nI have master degree in math and computer science (<a href="https://ssau.ru/english/">Samara University</a>).',
  Projects: [AvgustProject, ClearDotProject, DriveNotProject, IDLProject, ISSCargoTrafficProject, LeanCRMConstructorProject, LeanCRMMenu, ReebokEventProject, StreetQuestProject]
}, {
  Language: 'ru',
  Introduction: 'Привет! Я - тыжпрограммист!',
  Projects: [AvgustProjectRu, ClearDotProjectRu, DriveNotProjectRu, IDLProjectRu, ISSCargoTrafficProjectRu, LeanCRMConstructorProjectRu, LeanCRMMenuRu, ReebokEventProjectRu, StreetQuestProjectRu]
}]