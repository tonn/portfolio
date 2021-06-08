import React from 'react';
import { Button, ButtonGroup, GridList, GridListTile, GridListTileBar, Icon, SvgIcon } from '@material-ui/core';

import './App.scss';

import { LabeledRow } from './LabeledRow';
import ProjectDialog from './ProjectDialog';
import { IProject, CVs, ICV, Language } from './data';
import nameof from 'ts-nameof.macro';
import { BEM } from './helpers/BEM';
import { If } from './helpers/If';
import { ReactComponent as RuIcon } from './assets/russia.svg';
import { ReactComponent as UKIcon } from './assets/united-kingdom.svg';
import { Map } from './helpers/Map';

interface ILanguageModel {
  Language: Language,
  Icon: React.FC
}

const LanguageModels: ILanguageModel[] = [{
  Language: 'en',
  Icon: UKIcon
}, {
  Language: 'ru',
  Icon: RuIcon
}]

export default class App extends React.Component<any, {
  CV?: ICV,
  Language?: Language,
  CurrentProject?: IProject,
  OpenProjectDialog: boolean
}> {
  constructor(props: Readonly<{}>) {
    super(props);

    this.state = { OpenProjectDialog: false };

    
  }

  componentDidMount() {
    this.setLanguage('en');
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

  private setLanguage(lang: Language) {
    this.setState({ Language: lang, CV: CVs.find(cv => cv.Language === lang)});
  }

  render() {
    const { CV, Language } = this.state;

    return (
      <div className={block()}>
        <div className={elem('Scroll')}>
          <LabeledRow className={elem('Introduction')} Label='Introduction'>
            <span dangerouslySetInnerHTML={{ __html: CV?.Introduction || '' }} />
          </LabeledRow>

          <LabeledRow Label='Projects'>
            <GridList cellHeight={320} cols={3} spacing={12}>
              {CV?.Projects.map(project => 
                <GridListTile key={this.getProjectFirstImage(project)}>
                  <div className={elem('ProjectPreviewImage')}>
                    <img src={this.getProjectFirstImage(project)} onClick={() => this.onProjectClick(project)} alt='' />
                  </div>

                  <GridListTileBar title={project.Title} subtitle={project.Technologies.join(', ')} />
                </GridListTile>
              )}
            </GridList>
          </LabeledRow>
        </div>

        <If condition={!!this.state.CurrentProject}>
          <ProjectDialog Project={this.state.CurrentProject!} open={this.state.OpenProjectDialog} Closing={() => this.setState({ OpenProjectDialog: false })} />
        </If>

        <ButtonGroup className={elem('Langs')} size='small' variant='contained'>
          { LanguageModels.map(langvm => 
              <Button key={langvm.Language} 
                      color={Language === langvm.Language ? 'primary' : 'default'} 
                      onClick={() => this.setLanguage(langvm.Language)}><langvm.Icon /></Button>
          )}
        </ButtonGroup>
      </div>
    );
  }
}

const { block, elem } = BEM(nameof(App));
