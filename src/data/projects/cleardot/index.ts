import { IProject } from '../..';
import image1 from './images/cleardot1.png';
import image2 from './images/cleardot2.png';
import image3 from './images/cleardot3.png';
import image4 from './images/cleardot-feedback.png';
import image5 from './images/thumbnail.png';

export const ClearDotProject: IProject = {
  Title: 'ClearDot - multi-tenant workflow support system',
  Start: new Date(2017, 6),
  End: new Date(2017, 9),
  Technologies: ['html', 'scss', 'typescript', 'angular', 'azure', 'mssql', 'c#', 'asp.net', 'entityframework'],
  Description: 'Prototype of SaaS application for Quality Assurance. Application allows to register new tenant, manage tenant users, create inspection templates, grant rights for specific user to start inspection, fill inspection fields. Server side based on .Net Core, Entity Framework. Tenant isolation implemented with using database schemes. EF database migration mechanism is used for dbo and all tenant\'s schemes. Front side implemented with using Angular 4 and DevExtreme components library.',
  Images: [{
    Filename: image5
  }, {
    Filename: image1,
    Description: 'All workflow templates and inspections'
  }, {
    Filename: image2,
    Description: 'Template editor'
  }, {
    Filename: image3,
    Description: 'Inspection in process'
  }, {
    Filename: image4,
    Description: 'Customer feedback'
  }]
}

export const ClearDotProjectRu: IProject = {
  ...ClearDotProject
}