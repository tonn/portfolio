/* tslint:disable:max-line-length radix max-classes-per-file member-ordering no-console member-access ordered-imports */

import axios from 'axios';
import * as React from 'react';
import { GridList, GridListTile } from '@material-ui/core';

import './App.css';

import { IMainData, IProjectData } from './data';
import LabeledRow from './LabeledRow';

export default class App extends React.Component<any, {
  MainData?: IMainData,
  Projects?: IProjectData[]
}> {
  constructor(props: Readonly<{}>) {
    super(props);

    this.state = {};
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

  render() {
    return (
      <div className='App'>
        <LabeledRow Label='Introduction'>
          {this.state.MainData && this.state.MainData.Introduction}
        </LabeledRow>

        <LabeledRow Label='Projects'>
          <GridList cellHeight={320} cols={3}>
            {this.state.Projects && this.state.Projects.map(project => (
              <GridListTile key={this.getProjectFirstImage(project)}>
                <img className='App__ProjectPreviewImage' src={this.getProjectFirstImage(project)} />
              </GridListTile>
            ))}
          </GridList>
        </LabeledRow>
      </div>
    );
  }
}
