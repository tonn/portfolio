export interface IMainData {
  Introduction: string;
  Projects: string[];
}

export interface IProjectData {
  Name?: string;
  Title: string;
  Technologies: string[];
  Images?: Array<{ Filename: string, Description?: string }>;
}
