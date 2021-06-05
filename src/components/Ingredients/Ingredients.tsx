import * as React from 'react';

import Ingredient, { TIngredient } from '../Ingredient/Ingredient';

import styles from './Ingredients.module.css';

export type TIngredients = TIngredient[];

type TIngredientsProps = {
  title: string;
  ingredients: TIngredients;
  className?: string;
  onClick(id: string): void;
};

const Ingredients = ({ className, ingredients, title, onClick }: TIngredientsProps) => {
  return (
    <div className={className}>
      <h2 className="text text_type_main-medium mb-6">{title}</h2>
      <ul className={`${styles.list} pr-4 pl-4`}>
        {ingredients.map((ingredient) => (
          <Ingredient
            key={`ingredient-${ingredient._id}`}
            className={`${styles.item} mb-6 mr-6`}
            ingredient={ingredient}
            onClick={onClick}
          />
        ))}
      </ul>
    </div>
  );
};

export default Ingredients;
