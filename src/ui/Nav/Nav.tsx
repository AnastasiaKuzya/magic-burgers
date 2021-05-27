import React from 'react';
import classNames from 'classnames';

import styles from './Nav.module.css';

type TNavProps = {
  nav: {
    id: number;
    title: string;
    icon: any;
    href?: string;
    isActive?: boolean;
  }[];
  className?: string;
};

const Nav = ({ nav, className }: TNavProps) => (
  <nav className={classNames(styles.host, className)}>
    {nav.map((item) => (
      <a
        key={`nav-link-${item.id}`}
        className={classNames(
          styles.link,
          !item.isActive && 'text_color_inactive',
          'text',
          'text_type_main-default',
          'ml-10',
        )}
        href={item.href}>
        <item.icon type={item.isActive ? 'primary' : 'secondary'} />
        <span className="ml-2">{item.title}</span>
      </a>
    ))}
  </nav>
);

export default Nav;
