import * as React from 'react';
import classNames from 'classnames';

import styles from './ScrollContainer.module.css';

type TModalProps = {
  children: React.ReactNode;
  className?: string;
};

const ScrollContainer = ({ className, children }: TModalProps) => <div
  className={classNames(styles.host, className)}>{children}</div>;

export default ScrollContainer;
