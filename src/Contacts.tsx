import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import nameof from 'ts-nameof.macro';
import './App.scss';
import { ICV } from './data';
import { BEM, cn } from './helpers/BEM';
import { If } from './helpers/If';
import { Map } from './helpers/Map';
import './Contacts.scss';

export const Contacts: React.FC< { CV: ICV, className?: string }> = ({ CV, className }) => {
  return <div className={cn(block(), className)}>
    <Map items={CV.Contacts}>
      {contact => <span key={contact.Link} className={cn(elem('Contact'), !contact.Text && 'noscreen')}>
        <span className={elem('ContactLabel')}>{contact.Label}:&nbsp;</span>
        <If condition={!!contact.Text}>
          <a className={cn(!!contact.PrintText && 'noprint')} href={contact.Link} target='blank'>{contact.Text}</a>&nbsp;
          <FontAwesomeIcon icon={faCopy} className={cn(elem('ContactCopyButton'), 'noprint')} onClick={() => navigator.clipboard.writeText(contact.Text || '')} />
        </If>
        <If condition={!!contact.PrintText}>
          <a href=' ' className={'noscreen'}>{contact.PrintText}</a>
        </If>
      </span>}
    </Map>
  </div>;
}


const { block, elem } = BEM(nameof(Contacts));
 