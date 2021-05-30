import React from 'react';

import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import Price from '../../ui/Price/Price';

import styles from './Ingredient.module.css';
import classNames from 'classnames';

type TIngredientType = 'bun' | 'main' | 'sauce' | string;

export type TIngredient = {
  _id: string;
  name: string;
  type: TIngredientType;
  fat: number;
  price: number;
  calories: number;
  proteins: number;
  carbohydrates: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};

type TIngredientProps = {
  ingredient: TIngredient;
  className?: string;
};

const Ingredient = ({ ingredient, className }: TIngredientProps) => {
  const [count] = React.useState<number>(0);

  return (
    <li className={classNames(styles.host, className, 'pr-4 pl-4')}>
      {count > 0 && <Counter count={count} size="default" />}
      <img className="mb-2" src={ingredient.image} alt={ingredient.name} />
      <Price className="mb-2" price={ingredient.price} />
      <h3 className="text text_type_main-default mb-6">{ingredient.name}</h3>
    </li>
  );
};

export default Ingredient;
