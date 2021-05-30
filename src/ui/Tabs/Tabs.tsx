import React from 'react';
import classNames from 'classnames';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './Tabs.module.css';

export type TTab = { id: number; title: string };

type TTabs = TTab[];

type TTabsProps = { current: string; tabs: TTabs; onClick(id: number): void; className?: string };

const Tabs = ({ current, tabs, onClick, className }: TTabsProps) => (
  <div className={classNames(styles.host, className)}>
    {tabs.map((i) => (
      <Tab key={i.id} value={i.title} active={current === i.title} onClick={() => onClick(i.id)}>
        {i.title}
      </Tab>
    ))}
  </div>
);

export default Tabs;
