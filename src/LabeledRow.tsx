import React from 'react';
import nameof from 'ts-nameof.macro';
import { BEM, cn } from './helpers/BEM';

import './LabeledRow.scss';

export class LabeledRow extends React.Component<{ Label: string, className?: string, contentClass?: string }> {
  render() {
    return (
      <div className={cn(block(), this.props.className)}>
        <div className={elem('Label')}>{this.props.Label}</div>
        <div className={cn(elem('Content'), this.props.contentClass)}>{this.props.children}</div>
      </div>
    );
  }
}

const { block, elem } = BEM(nameof(LabeledRow));

