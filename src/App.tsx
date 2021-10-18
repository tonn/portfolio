import { Button, ButtonGroup, GridList, GridListTile, GridListTileBar } from '@material-ui/core';
import _ from 'lodash';
import React from 'react';
import GitInfo from 'react-git-info/macro';
import nameof from 'ts-nameof.macro';
import './App.scss';
import { ReactComponent as RuIcon } from './assets/russia.svg';
import { ReactComponent as UKIcon } from './assets/united-kingdom.svg';
import { CVs, ICV, IProject, Language } from './data';
import { BEM, cn } from './helpers/BEM';
import { If } from './helpers/If';
import { LabeledRow } from './LabeledRow';
import { PdfDialog } from './Pdf';
import ProjectDialog from './ProjectDialog';
import { Print, PictureAsPdf, FileCopy } from '@material-ui/icons';
import { DEV } from '.';
import { TimeIntervalsLength } from './helpers/TimeIntervalsLength';
import { Interval, max } from 'date-fns';
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

const Separator = () => <p className={elem1('Separator')}></p>;

export default class App extends React.Component<any, {
  CV?: ICV,
  Language?: Language,
  CurrentProject?: IProject,
  OpenProjectDialog: boolean,
  OpenPdfDialog: boolean,
  Techs: any[]
}> {
  constructor(props: Readonly<{}>) {
    super(props);

    this.state = { OpenProjectDialog: false, OpenPdfDialog: false, Techs: [] };
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
    this.setState({ Language: lang});
    this.setCV(CVs.find(cv => cv.Language === lang) || CVs[0]);
  }

  private downloadPdf() {
    window.open(`AntonNovikovCV_${this.state.CV?.Language}.pdf`, 'blank');
  }

  private getTechs(CV: ICV): { name: string, experienceYears: number }[] {
    const now = new Date();

    if (CV) {
      const techs: { [tech: string]: Interval[] } = {};

      for (const project of CV.Projects) {
        for (const tech of project.PrimaryTechs) {
          if (!techs[tech]) {
            techs[tech] = [];
          }

          techs[tech].push({ start: project.Start, end: project.End || now });
        }
      }

      return _.orderBy(Object.entries(techs), ([name, intervals]) => max(intervals.map(i => i.end)), 'desc')
              .map(([name, intervals]) => ({ name, experienceYears: TimeIntervalsLength(intervals) }));
    }

    return [];
  }

  private setCV(CV: ICV) {
    this.setState({ CV });

    const Techs = this.getTechs(CV);
    this.setState({ Techs });
    console.dir(Techs);
  }

  render() {
    const { CV, Language, Techs } = this.state;
    const { commit } = GitInfo();

    if (!CV) {
      return <div>Loading...</div>
    }

    return (<div className={block1()}>
      <div className={elem1('Intro')}>
        <div>
          <h1>About Me</h1>
          {/* <p><span>{CV.FirstName} {CV.SecondName}</span></p> */}

          <p dangerouslySetInnerHTML={{ __html: CV.Introduction || '' }}></p>

          <Map items={CV.Contacts}>
            {contact => <span className={elem1('Contact')}>
              <span className={elem1('ContactLabel')}>{contact.Label}</span>:&nbsp;
              <a href={contact.Link} target='blank'>{contact.Text}</a>&nbsp;
              <FileCopy className={cn(elem1('ContactCopyButton'), 'noprint')} onClick={() => navigator.clipboard.writeText(contact.Text)} />
            </span>}
          </Map>
        </div>
        <img className={elem1('Photo')} src={CV.Photo} alt='' />
      </div>
      
      <h1>Techs</h1>
      <p>
        { Techs.map((tech, index) => 
            <span key={tech.name} className={elem1('TechTag')}>
              <span className={elem1('TechName')}>{tech.name}</span>
              <span className={elem1('TechYear')}>&nbsp;{Math.round(tech.experienceYears * 10) / 10}&nbsp;years</span>
              {(index === Techs.length - 1) || <span className={elem1('TechComma')}>, </span>}
            </span>) }
      </p>

      <h1>Career</h1>
      <p>TODO</p>
      
      <h1>Projects</h1>
      {_.orderBy(CV.Projects, p => p.Start, 'desc').map(project => 
        <>
          <p> <span className={elem1('ProjectTitle')}>{project.Title}</span> </p>
          <p className={elem1('ProjectTechs')}>{project.PrimaryTechs.join(', ')}</p>
          <p className={elem1('ProjectDescription')}>{project.Description}</p>
          <p className={cn(elem1('ProjectImages'), 'noprint')}>
            <Map items={project.Images}>
              { (item) => <>
                <img className={elem('ProjectImage')} src={item.Thumb} alt='' />
              </> }
            </Map>
          </p>
          <Separator />
        </>)}

      <p className={elem1('Footer')}>Anton Novikov &copy; Updated {new Date(commit.date).toLocaleString()}</p>

      <ButtonGroup className={cn(elem('Langs'), 'noprint')} size='small' variant='contained'>
        { LanguageModels.map(langvm => 
            <Button key={langvm.Language} 
                    color={Language === langvm.Language ? 'primary' : 'default'} 
                    onClick={() => this.setLanguage(langvm.Language)}><langvm.Icon /></Button>
        )}

        <Button onClick={() => this.downloadPdf()}><PictureAsPdf /></Button>
        <Button onClick={() => window.print()}><Print /></Button>
      </ButtonGroup>
    </div>);

    /*
    return (
      <div className={block()}>
        <div className={elem('Scroll')}>
          <LabeledRow className={elem('Introduction')} Label='Introduction'>
            <span dangerouslySetInnerHTML={{ __html: CV?.Introduction || '' }} />
          </LabeledRow>

          <LabeledRow contentClass={elem('Techs')} Label='Technologies'>
            { Techs.map(tech => 
              <div className={elem('TechTag')} key={tech.name}>
                {tech.name} <span className={elem('TechYear')}>{Math.round(tech.experienceYears)} years</span><span className={elem('TechComma')}>,&nbsp;</span>
              </div>) }
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

        { CV && <PdfDialog open={this.state.OpenPdfDialog} closing={() => this.setState({ OpenPdfDialog: false })} cv={CV} /> }

        <ButtonGroup className={elem('Langs')} size='small' variant='contained'>
          { LanguageModels.map(langvm => 
              <Button key={langvm.Language} 
                      color={Language === langvm.Language ? 'primary' : 'default'} 
                      onClick={() => this.setLanguage(langvm.Language)}><langvm.Icon /></Button>
          )}

          <If condition={DEV}>
            <Button onClick={() => this.setState({ OpenPdfDialog: true })}>View pdf</Button>
          </If>
          <Button onClick={() => this.downloadPdf()}><PictureAsPdfIcon /></Button>
        </ButtonGroup>
      </div>
    );
    */
  }
}

const { block, elem } = BEM(nameof(App));

const { block: block1, elem: elem1 } = BEM(nameof(App) + 1);
