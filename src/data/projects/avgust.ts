import { IProject } from '..';

export const AvgustProject: IProject = {
  Title: 'Avgust Crop Protection',
  Start: new Date(2016, 6),
  Technologies: ['javascript', 'html', 'scss', 'cordova', 'angularjs'],
  Description: '',
  Images: [{
    Filename: 'assets/avgust/logo.jpg'
  }],
  Links: {
    GooglePlay: 'https://play.google.com/store/apps/details?id=com.avgust.avgustcropprotection',
    AppStore: 'https://itunes.apple.com/us/app/sredstva-zasity-rastenij-avgust/id1142238675'
  }
}

export const AvgustProjectRu: IProject = {
  ...AvgustProject,
  Title: 'Защита растений «Август»',
  Description: `
    Каталог продукции крупнейшей российской компании по производству и продаже химических средств защиты растений для сельскохозяйственного производства.
    Приложение имеет две верстки под телефоны и планшеты с удобными интерфейсами для навигации по справочникам, контекстным и глобальным полнотекстовым поисками. В приложение встроен весь объем данных по справочникам с фотографими. Реализовано инкрементальное обновление данных.
  `
}