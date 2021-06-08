import * as React from 'react';

import './ProjectDialog.scss';
import { Dialog, DialogTitle, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { IProject } from './data';
import { If } from './helpers/If';

export default class ProjectDialog extends React.Component<{ Project: IProject, className?: string, open: boolean, Closing: () => any }> {
  render() {
    const { Project, open, Closing } = this.props;

    return (
      <Dialog className={`ProjectDialog ${this.props.className}`} open={open}>
        <DialogTitle className={'ProjectDialog__DialogTitle'}>
          {Project.Title}
          <IconButton className={'ProjectDialog__CloseIcon'} aria-label="Close" onClick={Closing}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <div className={'ProjectDialog__Content'}>
          <div>
            {Project.Start.getFullYear()}.{Project.Start.getMonth() + 1} -  
            <If condition={!!Project.End}>
              {Project.End?.getFullYear()}.{(Project.End?.getMonth() || 0) + 1}
            </If>
            <If condition={!Project.End}>
              In progress
            </If>
          </div>
          Technologies: {Project.Technologies.join(', ')}<br/>
          <br/>
          {Project.Description}
        </div>
      </Dialog>
    );
  }
}
