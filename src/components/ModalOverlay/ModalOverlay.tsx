import * as React from 'react';
import classNames from 'classnames';

import styles from './ModalOverlay.module.css';

type TModalOverlayProps = {
    className?: string;
    onClose(): void;
};

const ModalOverlay = ({ className, onClose }: TModalOverlayProps) => {
    return (
        <div className={classNames(styles.host, className)} onClick={onClose} />
    );
};

export default ModalOverlay;
