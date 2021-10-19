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
import { FullscreenGallery, FullscreenGalleryProps } from './FullscreenGallery';
import { BEM, cn } from './helpers/BEM';
import { If } from './helpers/If';
import { Map } from './helpers/Map';
import { TimeIntervalsLength } from './helpers/TimeIntervalsLength';

/**
 * TODO:
 * 1) Pictures fullscreen view (zoom, pan, mobile friendly)
 * 2) Techs categories
 * 3) Techs sort
 * 4) Select techs to filter project (include techs in project summary)
 * 5) Fill the data!
 * 5) Add google stats. Or something like that.
 * 5) Publish. Make redirect from my domain
 * 6) Find editor
 * 7) Make something with photo
 * 8) Maybe keep project images with colors - now it looks boring
 * 9) Find designer
 * 10) Fix pdf layout (hide it before)
 * 11) Grab screens/screencasts from https://debug.upgdev.ru/app/scriptDesigner/scripts
 */

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

const MonthYear = (date: Date) => `${date.getFullYear()}/${date.getMonth() + 1}`;

const Dates: React.FC<{ Start: Date, End?: Date }> = ({Start, End}) => <span className={elem('Dates')}>
{ End ? <>{MonthYear(Start)} - {MonthYear(End)}</> 
      : <>In progress from {MonthYear(Start)}</>}  
</span>;

export default class App extends React.Component<any, {
  CV?: ICV,
  Language?: Language,
  CurrentProject?: IProject,
  Techs: any[], 
  FullscreenGallery?: FullscreenGalleryProps
}> {
  constructor(props: Readonly<{}>) {
    super(props);

    this.state = { Techs: [] };
  }

  componentDidMount() {
    this.setLanguage('en');
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
  }

  render() {
    const { CV, Language, Techs } = this.state;
    const { commit } = GitInfo();

    if (!CV) {
      return <div>Loading...</div>
    }

    return <>
      <div className={block()}>
        <div className={elem('Intro')}>
          <div>
            <div className={cn(elem('UtilButtons'), 'noprint')}>
              <Map items={LanguageModels}>
                {lang => 
                  <span key={lang.Language} className={elem('UtilButton', Language === lang.Language && 'Selected')} onClick={() => this.setLanguage(lang.Language)}>
                    {lang.Language},&nbsp;
                  </span>}
              </Map>
              <span className={elem('UtilButton')} onClick={() => this.downloadPdf()}>pdf,&nbsp;</span>
              <span className={elem('UtilButton')} onClick={() => window.print()}>print</span>
            </div>

            <h1>About Me</h1>

            <p dangerouslySetInnerHTML={{ __html: CV.Introduction || '' }}></p>

            <Map items={CV.Contacts}>
              {contact => <span key={contact.Link} className={elem('Contact')}>
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
          <Map items={Techs}>
          { (tech, index) => 
              <span key={tech.name} className={elem('TechTag')}>
                <span className={elem('TechName')}>{tech.name}</span>
                <span className={elem('TechYear')}>&nbsp;{Math.round(tech.experienceYears * 10) / 10}&nbsp;years</span>
                {(index === Techs.length - 1) || <span className={elem('TechComma')}>, </span>}
              </span> }
          </Map>
        </p>

        <h1>Projects</h1>
        <Map items={_.orderBy(CV.Projects, p => p.Start, 'desc')}>
          { project => 
            <React.Fragment key={project.Title}>
              <p> <span className={elem('ProjectTitle')}>{project.Title}</span> </p>
              <p className={elem('ProjectSummary')}>
                <Dates Start={project.Start} End={project.End} />
                <span className={elem('ProjectTechs')}>{project.PrimaryTechs.join(', ')}</span>
              </p>
              <p className={elem('ProjectDescription')}>{project.Description}</p>
              <p className={cn(elem('ProjectImages'), 'noprint')}>
                <Map items={project.Images}>
                  { (item) => <>
                    <img key={item.Thumb} className={elem('ProjectImage')} src={item.Thumb} alt='' 
                        onClick={() => this.setState({ FullscreenGallery: { 

                          Thumbs: project.Images.map(i => i.Thumb || ''), 
                          Images: project.Images.map(i => i.Filename),
                          OpenAt: project.Images.indexOf(item),
                          OnClose: () => this.setState({ FullscreenGallery: undefined })
                        } })} />
                  </> }
                </Map>
              </p>
              <Separator />
            </React.Fragment> }
        </Map>

        <h1>Career</h1>
        <Map items={_.orderBy(Object.values(CV.Career), i => i.Start, 'desc')}>
          { item => <p key={item.Label}>
            <Dates Start={item.Start} End={item.End} /> {item.Label} <If condition={!!item.Link}><a href={item.Link}>{item.LinkLabel || 'Organization site'}</a></If>
          </p> }
        </Map>

        <p className={cn(elem('Footer'), 'noprint')}>
          Anton Novikov &copy; Updated {new Date(commit.date).toLocaleString()}
          <div>Icons made by <a href='#' title='feen'>feen</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        </p>
      </div>
 
      { this.state.FullscreenGallery && <FullscreenGallery {...this.state.FullscreenGallery}/> }
    </>;
  }
}

const { block, elem } = BEM(nameof(App));
