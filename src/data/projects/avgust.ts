import { IProject } from '..';
import { Assets } from '../../assets.g';

export const AvgustProject: IProject = {
  Title: 'Avgust Crop Protection',
  Start: new Date(2016, 6),
  PrimaryTechs: ['javascript', 'html', 'scss', 'cordova', 'angularjs', 'ionic'],
  SecondaryTechs: ['ios', 'android'],
  Description: '',
  Images: [{
    Filename: Assets.avgust.i_a_logo,
    Thumb: Assets.avgust.i_a_logo_thumb
  }, {
    Filename: Assets.avgust.i_a_avgust_1,
    Thumb: Assets.avgust.i_a_avgust_1_thumb
  }, {
    Filename: Assets.avgust.i_a_avgust_2,
    Thumb: Assets.avgust.i_a_avgust_2_thumb
  }, {
    Filename: Assets.avgust.i_a_avgust_3,
    Thumb: Assets.avgust.i_a_avgust_3_thumb
  }, {
    Filename: Assets.avgust.i_a_avgust_5,
    Thumb: Assets.avgust.i_a_avgust_5_thumb
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
    Приложение имеет две верстки под телефоны и планшеты с удобными интерфейсами для навигации по справочникам, контекстным и глобальным полнотекстовым поисками. В приложение встроен весь объем данных по справочникам с фотографиями. Реализовано инкрементальное обновление данных.
  `
}