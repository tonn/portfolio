import { IProject } from '..';
import { Assets } from '../../assets.g';

export const ISSCargoTrafficProject: IProject = {
  Title: 'ISS Cargo Traffic',
  Start: new Date(2009, 8),
  End: new Date(2015, 0),
  PrimaryTechs: ['c#', 'winforms', 'wcf', 'mssql', 'entityframework'],
  Description: '',
  Images: [{
    Filename: Assets.ISSCargoTraffic.i_a_image009
  }, ...Object.values(Assets.ISSCargoTraffic).map(i => ({ Filename: i }))]}

export const ISSCargoTrafficProjectRu: IProject = {
  ...ISSCargoTrafficProject,
  Title: 'Система учета и планирования грузопотока на станцию МКС',
  Description: `
    Техническое руководство командой из 4 человек.
    Разработка клиент-серверной системы на основе .Net 3.5, DevExpress, MSSQL и использованием внутреннего стека технологий для клиент-серверного взаимодействия.
    Подготовка релизов, развертывание системы на стороне клиента.
  `
}
