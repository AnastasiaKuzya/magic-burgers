import React from 'react';
import type { TIngredients } from './../components/Ingredients/Ingredients';

export const IngredientsContext = React.createContext<{ ingredients: TIngredients }>({ ingredients: [] });

export const OrderIngredientsContext = React.createContext<{ orderedIngredients: TIngredients, }>({ orderedIngredients: [] });

export const TotalCostContext = React.createContext<{ totalCost: number, setTotalCost: React.Dispatch<React.SetStateAction<number>> }>({
    totalCost: 0,
    setTotalCost: (value) => value,
});
