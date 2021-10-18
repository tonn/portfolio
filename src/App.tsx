import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Interval, max } from 'date-fns';
import _ from 'lodash';
import React from 'react';
import GitInfo from 'react-git-info/macro';
import nameof from 'ts-nameof.macro';
import './App.scss';
import { ReactComponent as RuIcon } from './assets/russia.svg';
import { ReactComponent as UKIcon } from './assets/united-kingdom.svg';
import { CVs, ICV, IProject, Language } from './data';
import { BEM, cn } from './helpers/BEM';
import { Map } from './helpers/Map';
import { TimeIntervalsLength } from './helpers/TimeIntervalsLength';

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

const Separator = () => <p className={elem('Separator')}></p>;

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

    return (<div className={block()}>
      <div className={elem('Intro')}>
        <div>
          <div className={cn(elem('UtilButtons'), 'noprint')}>
            <Map items={LanguageModels}>
              {lang => <>
                <span className={elem('UtilButton', Language === lang.Language && 'Selected')} onClick={() => this.setLanguage(lang.Language)}>
                  {lang.Language}
                </span>,&nbsp;
              </>}
            </Map>
            <span className={elem('UtilButton')} onClick={() => this.downloadPdf()}>pdf,&nbsp;</span>
            <span className={elem('UtilButton')} onClick={() => window.print()}>print</span>
          </div>

          <h1>About Me</h1>

          <p dangerouslySetInnerHTML={{ __html: CV.Introduction || '' }}></p>

          <Map items={CV.Contacts}>
            {contact => <span className={elem('Contact')}>
              { contact.Label && <><span className={elem('ContactLabel')}>{contact.Label}</span>:&nbsp;</> }
              <a href={contact.Link} target='blank'>{contact.Text}</a>&nbsp;
              <FontAwesomeIcon icon={faCopy} className={cn(elem('ContactCopyButton'), 'noprint')} onClick={() => navigator.clipboard.writeText(contact.Text)} />
            </span>}
          </Map>
        </div>
        <img className={elem('Photo')} src={CV.Photo} alt='' />
      </div>
      
      <h1>Techs</h1>
      <p>
        { Techs.map((tech, index) => 
            <span key={tech.name} className={elem('TechTag')}>
              <span className={elem('TechName')}>{tech.name}</span>
              <span className={elem('TechYear')}>&nbsp;{Math.round(tech.experienceYears * 10) / 10}&nbsp;years</span>
              {(index === Techs.length - 1) || <span className={elem('TechComma')}>, </span>}
            </span>) }
      </p>

      <h1>Career</h1>
      <p>TODO</p>
      
      <h1>Projects</h1>
      {_.orderBy(CV.Projects, p => p.Start, 'desc').map(project => 
        <>
          <p> <span className={elem('ProjectTitle')}>{project.Title}</span> </p>
          <p className={elem('ProjectDescription')}>{project.Description}</p>
          <p className={cn(elem('ProjectImages'), 'noprint')}>
            <Map items={project.Images}>
              { (item) => <>
                <img className={elem('ProjectImage')} src={item.Thumb} alt='' />
              </> }
            </Map>
          </p>
          <Separator />
        </>)}


      <p className={cn(elem('Footer'), 'noprint')}>
        Anton Novikov &copy; Updated {new Date(commit.date).toLocaleString()}
        <div>Icons made by <a href="" title="feen">feen</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
      </p>
    </div>);
  }
}

const { block, elem } = BEM(nameof(App));
