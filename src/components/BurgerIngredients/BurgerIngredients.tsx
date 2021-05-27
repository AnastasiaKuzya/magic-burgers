import React from 'react';

import Tabs, { TTab } from '../../ui/Tabs/Tabs';
import Ingredients, { TIngredients } from '../Ingredients/Ingredients';

import styles from './BurgerIngredients.module.css';

type TBurgerIngredientsProps = {
  ingredients: TIngredients;
  className?: string;
};

type TTabFull = TTab & { list: TIngredients };

const BurgerIngredients = ({ className, ingredients }: TBurgerIngredientsProps) => {
  const tabs: TTabFull[] = [
    { id: 1, title: 'Булки', list: ingredients.filter((i) => i.type === 'bun') },
    { id: 2, title: 'Соусы', list: ingredients.filter((i) => i.type === 'sauce') },
    { id: 3, title: 'Начинки', list: ingredients.filter((i) => i.type === 'main') },
  ];

  const [current, setCurrent] = React.useState<TTab>(tabs[0]);

  const handleClick = (id: number) => {
    const tab = tabs.find((i) => i.id === id);
    if (tab) {
      setCurrent(tab);
    }
  };
  return (
    <section className={`${styles.host} ${className}`}>
      <Tabs className="mb-10" current={current.title} onClick={handleClick} tabs={tabs} />

      <div className={styles.content}>
        {tabs.map((i) => (
          <Ingredients key={`ingredients-${i.id}`} className="mb-10" ingredients={i.list} title={i.title} />
        ))}
      </div>
    </section>
  );
};

export default BurgerIngredients;
