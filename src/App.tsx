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
import { CVs, ICV, IProject, Language, TechCategories, TechsPriority } from './data';
import { FullscreenGallery, FullscreenGalleryProps } from './FullscreenGallery';
import { BEM, cn } from './helpers/BEM';
import { If } from './helpers/If';
import { Map } from './helpers/Map';
import { TimeIntervalsLength } from './helpers/TimeIntervalsLength';

/**
 * TODO:
 * 1)+ Pictures fullscreen view (zoom, pan, mobile friendly)
 * 2)+ Techs categories
 * 3)+ Techs sort
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

const Separator = () => <div className={elem('Separator')}></div>;

const MonthYear = (date: Date) => `${date.getFullYear()}/${date.getMonth() + 1}`;

const Dates: React.FC<{ Start: Date, End?: Date }> = ({Start, End}) => <span className={elem('Dates')}>
{ End ? <>{MonthYear(Start)} - {MonthYear(End)}</> 
      : <>In progress from {MonthYear(Start)}</>}  
</span>;

type TechsGroup = 'off' | 'on';
const TechGroupVariants: TechsGroup[] = ['off', 'on']
type TechsSort = 'name' | 'actuality';
const TechSortVariants: TechsSort[] = ['actuality', 'name'];

interface ITech { name: string, experienceYears: number };

export default class App extends React.Component<any, {
  CV?: ICV,
  Language?: Language,
  CurrentProject?: IProject,
  TechsGroups: { [name: string]: ITech[] }, 
  FullscreenGallery?: FullscreenGalleryProps,
  TechsGroup: TechsGroup,
  TechsSort: TechsSort
}> {
  constructor(props: Readonly<{}>) {
    super(props);

    this.state = { TechsGroups: {}, TechsGroup: 'off', TechsSort: 'actuality' };
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

  private refreshTechs() {
    const now = new Date();
    const cv = this.state.CV;
    const sort = this.state.TechsSort;
    const group = this.state.TechsGroup;

    if (cv) {
      const preTechs: { [tech: string]: Interval[] } = {};

      for (const project of cv.Projects) {
        for (const tech of project.PrimaryTechs) {
          if (!preTechs[tech]) {
            preTechs[tech] = [];
          }

          preTechs[tech].push({ start: project.Start, end: project.End || now });
        }
      }

      const sortBySelector = ([name, intervals]: [name: string, intervals: Interval[]]) => 
        sort === 'actuality' ? max(intervals.map(i => i.end)) : 
        sort === 'name'      ? name : (() => { throw Error() })();

      const sortByPriority = ([name, intervals]: [name: string, intervals: Interval[]]) =>
        TechsPriority.indexOf(name);

      const sortDesc = sort === 'actuality';

      const techs = _.orderBy(Object.entries(preTechs), [sortBySelector, sortByPriority], [sortDesc ? 'desc' : 'asc', 'asc'])
                     .map(([name, intervals]) => ({ name, experienceYears: TimeIntervalsLength(intervals), intervals }));

      const groups: { [name: string]: ITech[] } = {};

      if (group === 'on') {
        const unknown: ITech[] = [];

        for (const tech of techs) {
          let known = false;

          for (const group in TechCategories) {
            if (TechCategories[group].includes(tech.name)) {
              groups[group] = groups[group] || [];
              groups[group].push(tech);
              known = true;
            }
          }

          if (!known) {
            unknown.push(tech);
          }
        }

        groups['Other'] = groups['Other'] || []
        groups['Other'].push(...unknown);
      } else {
        groups[''] = techs;
      }
      
      this.setState({ TechsGroups: groups });
    }
  }

  private async setCV(CV: ICV) {
    this.setState({ CV }, () => {
      this.refreshTechs();
    });
  }

  private setTechsGroup(groupBy: TechsGroup) {
    this.setState({ TechsGroup: groupBy }, () => {
      this.refreshTechs();
    });
  }

  private setTechsSort(sortBy: TechsSort) {
    this.setState({ TechsSort: sortBy }, () => {
      this.refreshTechs();
    });
  }

  render() {
    const { CV, Language, TechsGroups, TechsGroup, TechsSort } = this.state;
    const { commit } = GitInfo();

    if (!CV) {
      return <div>Loading...</div>
    }

    return <>
      <div className={block()}>
        <div className={cn(elem('UtilButtons'), 'noprint')}>
          <Map items={LanguageModels}>
            {lang => 
              <div key={lang.Language} className={elem('UtilButton', Language === lang.Language && 'Selected')} onClick={() => this.setLanguage(lang.Language)}>
                {lang.Language},&nbsp;
              </div>}
          </Map>
          <div className={elem('UtilButton')} onClick={() => this.downloadPdf()}>pdf,&nbsp;</div>
          <div className={elem('UtilButton')} onClick={() => window.print()}>print</div>
        </div>
        <div className={elem('Intro')}>
          <h1 className={elem('IntroTitle')}>About Me</h1>

          <div className={elem('IntroText')} dangerouslySetInnerHTML={{ __html: CV.Introduction || '' }}></div>

          <div className={elem('Contacts')}>
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
        <div className={cn(elem('TechsOptions'), 'noprint')}>
          Grouping:&nbsp;
          <Map items={TechGroupVariants}>
            {(item, index) => <>
              <If condition={index !== 0}>,&nbsp;</If>
              <div className={elem('TechsOptionsItem', TechsGroup === item && 'Selected')} onClick={() => this.setTechsGroup(item)}>{item}</div></>}
          </Map>

          &nbsp;Sort by:&nbsp;
          <Map items={TechSortVariants}>
            {(item, index) => <>
              <If condition={index !== 0}>,&nbsp;</If>
              <div className={elem('TechsOptionsItem', TechsSort === item && 'Selected')} onClick={() => this.setTechsSort(item)}>{item}</div>
            </>}
          </Map>
        </div>
        <div className={elem('Techs', TechsGroup === 'off' && 'NoGrouping')}>
          <Map items={Object.keys(TechsGroups)}>
            { group => <>
              <If condition={!!group}><div className={elem('TechsGroupTitle')}>{group}:</div></If>
              <div className={elem('TechsGroupItems')}>
                <Map items={TechsGroups[group]}>
                  { (tech, index) => 
                    <span key={tech.name} className={elem('TechTag')}>
                      <If condition={index !== 0}><span className={elem('TechComma')}>, </span></If>
                      <span className={elem('TechName')}>{tech.name}</span>
                      <span className={elem('TechYear')}>&nbsp;{Math.round(tech.experienceYears * 10) / 10}&nbsp;years</span>                    
                    </span> }
                </Map> 
              </div>
            </>}
          </Map>
        </div>

        <h1>Projects</h1>
        <Map items={_.orderBy(CV.Projects, p => p.Start, 'desc')}>
          { project => 
            <React.Fragment key={project.Title}>
              <div> <span className={elem('ProjectTitle')}>{project.Title}</span> </div>
              <div className={elem('ProjectSummary')}>
                <Dates Start={project.Start} End={project.End} />
                <span className={elem('ProjectTechs')}>{project.PrimaryTechs.join(', ')}</span>
              </div>
              <div className={elem('ProjectDescription')}>{project.Description}</div>
              <div className={cn(elem('ProjectImages'), 'noprint')}>
                <Map items={project.Images}>
                  { (item) => <>
                    <img key={item.Thumb} className={elem('ProjectImage')} src={item.Thumb} alt='' 
                        onClick={() => this.setState({ FullscreenGallery: { 
                          Images: project.Images,
                          OpenAt: project.Images.indexOf(item),
                          OnClose: () => this.setState({ FullscreenGallery: undefined })
                        } })} />
                  </> }
                </Map>
              </div>
              <Separator />
            </React.Fragment> }
        </Map>

        <h1>Career</h1>
        <Map items={_.orderBy(Object.values(CV.Career), i => i.Start, 'desc')}>
          { item => <div key={item.Label}>
            <Dates Start={item.Start} End={item.End} /> {item.Label} <If condition={!!item.Link}><a href={item.Link}>{item.LinkLabel || 'Organization site'}</a></If>
          </div> }
        </Map>

        <div className={cn(elem('Footer'), 'noprint')}>
          Anton Novikov &copy; Updated {new Date(commit.date).toLocaleString()}
          <div>Icons made by <a href='#' title='feen'>feen</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        </div>
      </div>
 
      { this.state.FullscreenGallery && <FullscreenGallery {...this.state.FullscreenGallery}/> }
    </>;
  }
}

const { block, elem } = BEM(nameof(App));
