import * as React from 'react';
import classNames from 'classnames';

import styles from './ScrollContainer.module.css';

type TModalProps = React.HTMLAttributes<HTMLDivElement>;

const ScrollContainer = ({ className, children, ...otherProps }: TModalProps) => <div
    className={classNames(styles.host, className)} {...otherProps}>{children}</div>;

export default ScrollContainer;
