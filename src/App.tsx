import React from 'react';
import { GridList, GridListTile, GridListTileBar } from '@material-ui/core';

import './App.scss';

import LabeledRow from './LabeledRow';
import ProjectDialog from './ProjectDialog';
import { IProject, CV } from './data';
import nameof from 'ts-nameof.macro';
import { BEM } from './helpers/BEM';
import { Map } from './helpers/Map';
import { If } from './helpers/If';

export default class App extends React.Component<any, {
  CurrentProject?: IProject,
  OpenProjectDialog: boolean
}> {
  constructor(props: Readonly<{}>) {
    super(props);

    this.state = { OpenProjectDialog: false };
  }

  private getProjectFirstImage(project: IProject): string {
    if (project.Images && project.Images.length > 0) {
      return project.Images[0].Filename;
    }

    return '';
  }

  private onProjectClick(project: IProject) {
    this.setState({ CurrentProject: project, OpenProjectDialog: true });
  }

  render() {
    return (
      <div className={block()}>
        <LabeledRow className={elem('Introduction')} Label='Introduction'>
          <span dangerouslySetInnerHTML={{ __html: CV.Introduction }} />
        </LabeledRow>

        <LabeledRow Label='Projects'>
          <GridList cellHeight={320} cols={3} spacing={12}>
            {CV.Projects.map(project => 
              <GridListTile key={this.getProjectFirstImage(project)}>
                <div className={elem('ProjectPreviewImage')}>
                  <img src={this.getProjectFirstImage(project)} onClick={() => this.onProjectClick(project)} alt='' />
                </div>

                <GridListTileBar title={project.Title} subtitle={project.Technologies.join(', ')} />
              </GridListTile>
            )}
          </GridList>
        </LabeledRow>

        <If condition={!!this.state.CurrentProject}>
          <ProjectDialog Project={this.state.CurrentProject!} open={this.state.OpenProjectDialog} Closing={() => this.setState({ OpenProjectDialog: false })} />
        </If>
      </div>
    );
  }
}

const { block, elem } = BEM(nameof(App));
