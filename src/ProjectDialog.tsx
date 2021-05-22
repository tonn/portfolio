/* tslint:disable:max-line-length radix max-classes-per-file member-ordering no-console member-access ordered-imports */

import * as React from 'react';

import './ProjectDialog.css';
import { Dialog, DialogTitle, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { IProjectData } from './data';

export default class ProjectDialog extends React.Component<{ Project: IProjectData, className?: string, open: boolean, Closing: () => any }> {
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
          Technologies: {Project.Technologies.join(', ')}<br/>
          <br/>
          {Project.Description}
        </div>
      </Dialog>
    );
  }
}
