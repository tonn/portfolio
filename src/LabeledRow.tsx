/* tslint:disable:max-line-length radix max-classes-per-file member-ordering no-console member-access ordered-imports */

import * as React from 'react';

import './LabeledRow.css';

export default class LabeledRow extends React.Component<{ Label: string, className?: string }> {
  render() {
    return (
      <div className={`LabeledRow ${this.props.className}`}>
        <div className='LabeledRow__Label'>{this.props.Label}</div>
        <div className='LabeledRow__Content'>{this.props.children}</div>
      </div>
    );
  }
}
