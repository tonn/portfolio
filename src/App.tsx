import { Button, ButtonGroup, GridList, GridListTile, GridListTileBar } from '@material-ui/core';
import _ from 'lodash';
import React from 'react';
import GitInfo from 'react-git-info/macro';
import nameof from 'ts-nameof.macro';
import './App.scss';
import { ReactComponent as RuIcon } from './assets/russia.svg';
import { ReactComponent as UKIcon } from './assets/united-kingdom.svg';
import { CVs, ICV, IProject, Language } from './data';
import { BEM } from './helpers/BEM';
import { If } from './helpers/If';
import { LabeledRow } from './LabeledRow';
import { PdfDialog } from './Pdf';
import ProjectDialog from './ProjectDialog';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';

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
  OpenProjectDialog: boolean,
  OpenPdfDialog: boolean
}> {
  constructor(props: Readonly<{}>) {
    super(props);

    this.state = { OpenProjectDialog: false, OpenPdfDialog: false };    
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
    const { commit } = GitInfo();

    return (
      <div className={block()}>
        <div className={elem('Scroll')}>
          <LabeledRow className={elem('Introduction')} Label='Introduction'>
            <span dangerouslySetInnerHTML={{ __html: CV?.Introduction || '' }} />
          </LabeledRow>

          <LabeledRow Label='Projects'>
            <GridList cellHeight={320} cols={3} spacing={12}>
              {_.orderBy(CV?.Projects, p => p.Start).map(project => 
                <GridListTile key={project.Title} onClick={() => this.onProjectClick(project)}>
                  <img className={elem('ProjectPreviewImage')} src={this.getProjectFirstImage(project)}  alt='' />

                  <GridListTileBar title={project.Title}  subtitle={project.Technologies.join(', ')} />
                </GridListTile>
              )}
            </GridList>
          </LabeledRow>

          <div className={elem('Footer')}>
            Anton Novikov &copy; Updated {new Date(commit.date).toLocaleString()}
          </div>
        </div>

        <If condition={!!this.state.CurrentProject}>
          <ProjectDialog Project={this.state.CurrentProject!} open={this.state.OpenProjectDialog} Closing={() => this.setState({ OpenProjectDialog: false })} />
        </If>

        <PdfDialog open={this.state.OpenPdfDialog} closing={() => this.setState({ OpenPdfDialog: false })} />

        <ButtonGroup className={elem('Langs')} size='small' variant='contained'>
          { LanguageModels.map(langvm => 
              <Button key={langvm.Language} 
                      color={Language === langvm.Language ? 'primary' : 'default'} 
                      onClick={() => this.setLanguage(langvm.Language)}><langvm.Icon /></Button>
          )}

          <Button onClick={() => this.setState({ OpenPdfDialog: true })}><PictureAsPdfIcon /></Button>
        </ButtonGroup>
      </div>
    );
  }
}

const { block, elem } = BEM(nameof(App));
