import { ClearDotProject } from './projects/cleardot';
import { DriveNotProject } from './projects/drivenot';
import { LeanCRMConstructorProject } from './projects/leancrm-constructor';
import { LeanCRMMenu } from './projects/leancrm-menu';
import { StreetQuestProject } from './projects/streetquest';

export const CV = {
  Introduction: "Hi! I'm professional full-stack developer with 9 total years of work experience.\n\nMy main experience by technologies:\nC#/Entity Framework/WCF/WinForms/DevExpress: 6 years\nASP.net/WebAPI/Owin: 2 years\nHTML5/JS/CSS/SCSS/Angular 1: 4 years\nCordova/PhoneGap/Ionic/Android/iOS: 3 years\nTypeScript/Angular 2+/Ionic 2: 3 year\nAdditional experience in Nuget, NodeJS/NPM, Gulp, T4 template, XSLT, C++/Qt, python\n\nStrong in Git (usually I use git-flow).\n\nI have master degree in math and computer science (<a href=\"https://ssau.ru/english/\">Samara University</a>).",
  Projects: [ClearDotProject, DriveNotProject, LeanCRMConstructorProject, LeanCRMMenu, StreetQuestProject]
}

export interface IProject {
  Title: string,
  YearStart: number,
  YearEnd?: number,
  Technologies: string[],
  Description: string,
  Images: {
    Filename: string,
    Description?: string
  }[]
}