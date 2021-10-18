import { IProject } from '..';
import { Assets } from '../../assets.g';

export const ClearDotProject: IProject = {
  Title: 'ClearDot - multi-tenant workflow support system',
  Start: new Date(2017, 6),
  End: new Date(2017, 9),
  PrimaryTechs: ['html', 'scss', 'typescript', 'angular', 'azure', 'mssql', 'c#', 'asp.net', 'entityframework'],
  Description: 'Prototype of SaaS application for Quality Assurance. Application allows to register new tenant, manage tenant users, create inspection templates, grant rights for specific user to start inspection, fill inspection fields. Server side based on .Net Core, Entity Framework. Tenant isolation implemented with using database schemes. EF database migration mechanism is used for dbo and all tenant\'s schemes. Front side implemented with using Angular 4 and DevExtreme components library.',
  Images: [{
    Filename: Assets.cleardot.i_a_thumbnail,
    Thumb: Assets.cleardot.i_a_thumbnail_thumb
  }, {
    Filename: Assets.cleardot.i_a_cleardot1,
    Thumb: Assets.cleardot.i_a_cleardot1_thumb,
    Description: 'All workflow templates and inspections'
  }, {
    Filename: Assets.cleardot.i_a_cleardot2,
    Thumb: Assets.cleardot.i_a_cleardot2_thumb,
    Description: 'Template editor'
  }, {
    Filename: Assets.cleardot.i_a_cleardot3,
    Thumb: Assets.cleardot.i_a_cleardot3_thumb,
    Description: 'Inspection in process'
  }, {
    Filename: Assets.cleardot.i_a_cleardot_feedback,
    Thumb: Assets.cleardot.i_a_cleardot_feedback_thumb,
    Description: 'Customer feedback'
  }]
}

export const ClearDotProjectRu: IProject = {
  ...ClearDotProject
}