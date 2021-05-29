import React from 'react';
import classNames from 'classnames';

import { Button, ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import type { TIngredients } from '../Ingredients/Ingredients';

import styles from './BurgerConstructor.module.css';
import Price from '../../ui/Price/Price';

type TBurgerConstructorProps = {
  ingredients: TIngredients;
  className?: string;
};

const BurgerConstructor = ({ className, ingredients }: TBurgerConstructorProps) => {
  const [price] = React.useState<number>(ingredients.reduce((sum, current) => sum + current.price, 0));
  const bun = ingredients.find(i => i.type === 'bun') || ingredients[0];
  return (
    <section className={classNames(styles.host, className)}>
      <ul className={`mb-10 pl-10`} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <li key={`constructor-${bun._id}`} className={`${styles.item} pl-8`}>
          <ConstructorElement
            type='top'
            isLocked={true}
            text={bun.name}
            price={bun.price}
            thumbnail={bun.image_mobile}
          />
        </li>
        <ul className={styles.list} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {ingredients.filter(i => i.type !== 'bun').map((i) => (
            <li key={`constructor-${i._id}`} className={`${styles.item} pl-8`}>
              <span className={styles.icon}>
                <DragIcon type='primary' />
              </span>
              <ConstructorElement
                type={undefined}
                isLocked={false}
                text={i.name}
                price={i.price}
                thumbnail={i.image_mobile}
              />
            </li>
          ))}
        </ul>
        <li key={`constructor-${bun._id}`} className={`${styles.item} pl-8`}>
          <ConstructorElement
            type='bottom'
            isLocked={true}
            text={bun.name}
            price={bun.price}
            thumbnail={bun.image_mobile}
          />
        </li>
      </ul>
      <div className={`${styles.footer} mt-10 pr-10`}>
        <Price className='mr-10' price={price} size='medium' />
        <Button type='primary' size='large'>
          Нажми на меня
        </Button>
      </div>
    </section>
  );
};

export default BurgerConstructor;
