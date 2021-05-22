/* tslint:disable:max-line-length radix max-classes-per-file member-ordering no-console member-access ordered-imports */

import axios from 'axios';
import * as React from 'react';
import { GridList, GridListTile, GridListTileBar } from '@material-ui/core';

import './App.css';

import { IMainData, IProjectData } from './data';
import LabeledRow from './LabeledRow';
import ProjectDialog from './ProjectDialog';

export default class App extends React.Component<any, {
  MainData?: IMainData,
  Projects?: IProjectData[],
  CurrentProject?: IProjectData,
  OpenProjectDialog: boolean
}> {
  constructor(props: Readonly<{}>) {
    super(props);

    this.state = { OpenProjectDialog: false };
  }

  async componentDidMount() {
    const mainData = (await axios.get('data/main.json')).data as IMainData;

    this.setState({ MainData: mainData });

    const projects = await Promise.all(mainData.Projects.map(async projectName => {
      const project = (await axios.get(`data/projects/${projectName}/info.json`)).data as IProjectData;
      project.Name = projectName;
      return project;
    }));

    this.setState({ Projects: projects });

    console.dir(projects);
  }

  private renderProject(project: IProjectData) {
    return (
      <div>
        {project.Title}<br/>
        Technologies: {project.Technologies.join(', ')}<br/>
        {project.Images && project.Images.map(image => <img src={`data/projects/${project.Name}/${image.Filename}`} />)}
      </div>
    );
  }

  private getProjectFirstImage(project: IProjectData): string {
    if (project.Images && project.Images.length > 0) {
      return `data/projects/${project.Name}/${project.Images[0].Filename}`;
    }

    return '';
  }

  private onProjectClick(project: IProjectData) {
    this.setState({ CurrentProject: project, OpenProjectDialog: true });
  }

  render() {
    return (
      <div className='App'>
        <LabeledRow className='App__Introduction' Label='Introduction'>
          <span dangerouslySetInnerHTML={{ __html: (this.state.MainData && this.state.MainData.Introduction) || '' }} />
        </LabeledRow>

        <LabeledRow Label='Projects'>
          <GridList cellHeight={320} cols={3} spacing={12}>
            {this.state.Projects && this.state.Projects.map(project => (
              <GridListTile key={this.getProjectFirstImage(project)}>
                <div className='App__ProjectPreviewImage'>
                  <img src={this.getProjectFirstImage(project)} onClick={() => this.onProjectClick(project)} />
                </div>

                <GridListTileBar title={project.Title} subtitle={project.Technologies.join(', ')} />
              </GridListTile>
            ))}
          </GridList>
        </LabeledRow>

        { this.state.CurrentProject ? <ProjectDialog Project={this.state.CurrentProject} open={this.state.OpenProjectDialog} Closing={() => this.setState({ OpenProjectDialog: false })}/> : '' }
      </div>
    );
  }
}
