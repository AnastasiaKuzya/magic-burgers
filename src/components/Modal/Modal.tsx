import * as React from 'react';
import * as ReactDOM from 'react-dom';
import classNames from 'classnames';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import ModalOverlay from './../ModalOverlay/ModalOverlay';

import styles from './Modal.module.css';

type TModalProps = {
  title?: string;
  children: React.ReactNode;
  className?: string;
  onClose(): void;
};

const modalRoot = document.getElementById('modals');

const Modal = ({ className, title, onClose, children }: TModalProps) => ReactDOM.createPortal(
  (
    <div className={classNames(styles.host, className)}>
      <ModalOverlay onClose={onClose} />
      <div className={styles.modal}>
        <header className={styles.header}>
          {title && <h2 className='text text_type_main-large'>{title}</h2>}
          <button className={styles.close} onClick={onClose}>
            <CloseIcon type='primary' />
          </button>
        </header>
        {children}
      </div>
    </div>
    // @ts-expect-error
  ), modalRoot,
);

export default Modal;
