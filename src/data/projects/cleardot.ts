import { IProject } from '..';

export const ClearDotProject: IProject = {
  Title: 'ClearDot - multi-tenant workflow support system',
  Start: new Date(2017, 6),
  End: new Date(2017, 9),
  Technologies: ['html', 'scss', 'typescript', 'angular', 'azure', 'mssql', 'c#', 'asp.net', 'entityframework'],
  Description: 'Prototype of SaaS application for Quality Assurance. Application allows to register new tenant, manage tenant users, create inspection templates, grant rights for specific user to start inspection, fill inspection fields. Server side based on .Net Core, Entity Framework. Tenant isolation implemented with using database schemes. EF database migration mechanism is used for dbo and all tenant\'s schemes. Front side implemented with using Angular 4 and DevExtreme components library.',
  Images: [{
    Filename: 'assets/cleardot/thumbnail.png'
  }, {
    Filename: 'assets/cleardot/cleardot1.png',
    Description: 'All workflow templates and inspections'
  }, {
    Filename: 'assets/cleardot/cleardot2.png',
    Description: 'Template editor'
  }, {
    Filename: 'assets/cleardot/cleardot3.png',
    Description: 'Inspection in process'
  }, {
    Filename: 'assets/cleardot/cleardot-feedback.png',
    Description: 'Customer feedback'
  }]
}

export const ClearDotProjectRu: IProject = {
  ...ClearDotProject
}