import * as React from 'react';
import classNames from 'classnames';
import type { TIngredient } from './../Ingredient/Ingredient';

import styles from './IngredientDetails.module.css';

type TModalProps = {
  ingredient: TIngredient;
  className?: string;
};

const IngredientDetails = ({ className, ingredient }: TModalProps) => {
  const features: { id: number; title: string; value: number }[] = [{
    id: 1,
    title: 'Калории,ккал',
    value: ingredient.calories,
  },
    {
      id: 2,
      title: 'Белки, г',
      value: ingredient.proteins,
    },
    {
      id: 3,
      title: 'Жиры, г',
      value: ingredient.fat,
    },
    {
      id: 4,
      title: 'Углеводы, г',
      value: ingredient.carbohydrates,
    },
  ];

  return (
    <div className={classNames(styles.host, className)}>
      <img className={`${styles.img} mb-4`} src={ingredient.image_large} alt='done' />
      <h2 className={`${styles.desc} text text_type_main-medium mb-7`}>
        {ingredient.name}
      </h2>
      <ul className={styles.list}>
        {features.map(i => <li key={`info-${i.id}`}
                               className={`${styles.item} text text_type_main-default text_color_inactive`}>
          <span className='mb-2'>{i.title}</span>
          <span className='text text_type_digits-default'>{i.value}</span>
        </li>)}
      </ul>
    </div>
  );
};

export default IngredientDetails;
