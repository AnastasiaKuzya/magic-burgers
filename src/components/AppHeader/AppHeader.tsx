import * as React from 'react';

import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import Nav from '../../ui/Nav/Nav';

import styles from './AppHeader.module.css';

const nav = [
  { id: 1, title: 'Конструктор', icon: BurgerIcon, isActive: true },
  {
    id: 2,
    title: 'Лента заказов',
    icon: ListIcon,
  },
];

const AppHeader = () => (
  <header className={styles.host}>
    <div className={`p-5 ${styles.container}`}>
      <Nav className={`${styles.item} ${styles.itemLeft}`} nav={nav} />

      <div className={styles.item}>
        <Logo />
      </div>

      <div className={`${styles.item} ${styles.itemRight}`}>
        <a className={styles.link} href={'/'}>
          <ProfileIcon type="secondary" />
          <p className="text text_type_main-default text_color_inactive ml-2">Личный кабинет</p>
        </a>
      </div>
    </div>
  </header>
);

export default AppHeader;
