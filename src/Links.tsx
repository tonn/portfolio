import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import nameof from 'ts-nameof.macro';
import './App.scss';
import { ILink } from './data';
import { BEM, cn } from './helpers/BEM';
import { If } from './helpers/If';
import { Map } from './helpers/Map';
import './Links.scss';

export const Links: React.FC< { links: ILink[], className?: string }> = ({ links, className }) => {
  return <div className={cn(block(), className)}>
    <Map items={links}>
      {link => 
        <span key={link.Link || link.PrintText} 
              className={cn(elem('Contact'), link.Visibility === 'print' && 'noscreen', link.Visibility === 'screen' && 'noprint')}>
          <If condition={!!link.Icon}>
            <FontAwesomeIcon icon={link.Icon!} />&nbsp;
          </If>

          <If condition={!!link.Label}>
            <span className={elem('ContactLabel')}>{link.Label}:&nbsp;</span>
          </If>

          <a className={'noprint'} href={link.Link} target='blank'>{link.Text || link.Link || link.PrintText}</a>&nbsp;
          <a className={'noscreen'} href=' '>{link.PrintText || link.Link || link.Text || 'TODO'}</a>

          <FontAwesomeIcon icon={faCopy} className={cn(elem('ContactCopyButton'), 'noprint')} onClick={() => navigator.clipboard.writeText(link.Text || '')} />
        </span>}
    </Map>
  </div>;
}


const { block, elem } = BEM(nameof(Links));
 