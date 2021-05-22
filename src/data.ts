export interface IMainData {
  Introduction: string;
  Projects: string[];
}

export interface IProjectData {
  Name?: string;
  Title: string;
  Technologies: string[];
  Description: string;
  Images?: Array<{ Filename: string, Description?: string }>;
  Role?: string;
}
