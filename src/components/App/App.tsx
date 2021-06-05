import * as React from 'react';
import classNames from 'classnames';

import AppHeader from './../AppHeader/AppHeader';
import BurgerIngredients from './../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from './../BurgerConstructor/BurgerConstructor';
import type { TIngredients } from './../Ingredients/Ingredients';
import type { TIngredient } from './../Ingredient/Ingredient';
import OrderDetails from './../OrderDetails/OrderDetails';
import IngredientDetails from './../IngredientDetails/IngredientDetails';

import styles from './App.module.css';

const URL = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
  const [ingredients, setIngredients] = React.useState<TIngredients | null>(null);
  const [onShowOrderDetails, setOnShowOrderDetails] = React.useState<boolean>(false);
  const [onShowIngredientDetails, setOnShowIngredientDetails] = React.useState<boolean>(false);
  const [activeIngredient, setStateActiveIngredient] = React.useState<TIngredient | null>(null);
  const [isError, setIsError] = React.useState<boolean>(false);

  React.useEffect(() => {
    const getData = async () => {
      const res = await fetch(URL);
      const data: { data: TIngredients; success: boolean } = await res.json();
      return data;
    };

    getData().then(res => setIngredients(res.data)).catch(e => {
      console.error(e);
      setIsError(true);
    });
  }, []);

  React.useEffect(() => {
    document.addEventListener('keydown', e => closeAllModals(e));

    return () => document.removeEventListener('keydown', e => closeAllModals(e));
  });

  const closeAllModals = (e: KeyboardEvent) => {
    if (e.keyCode === 27) {
      setOnShowOrderDetails(false);
      setOnShowIngredientDetails(false);
    }
  };

  const handleStateModalOrderDetails = () => {
    setOnShowOrderDetails(!onShowOrderDetails);
  };

  const handleStateModalIngredientDetails = () => {
    setOnShowIngredientDetails(!onShowIngredientDetails);
  };


  const handleClickIngredientDetails = (id: string) => {
    handleStateModalIngredientDetails();

    const activeItem = ingredients?.find(i => i._id === id);
    if (activeItem) {
      setStateActiveIngredient(activeItem);
    }
  };

  return (
    <div className={styles.host}>
      <AppHeader />
      <main className={classNames(styles.container, 'pt-10 pr-5 pb-10 pl-5')}>
        <h1 className={classNames(styles.title, 'text text_type_main-large mb-5')}>Соберите бургер</h1>
        {ingredients ? <div className={styles.content}>
          <BurgerIngredients className={styles.contentItem} ingredients={ingredients}
                             onClick={handleClickIngredientDetails} />
          <BurgerConstructor className={styles.contentItem} ingredients={ingredients}
                             onClick={handleStateModalOrderDetails} />
        </div> : isError && <p>Произошла ошибка загрузки данных</p>}
      </main>
      {onShowOrderDetails && <OrderDetails onClose={handleStateModalOrderDetails} />}
      {onShowIngredientDetails && activeIngredient &&
      <IngredientDetails onClose={handleStateModalIngredientDetails} ingredient={activeIngredient} />}
    </div>
  );
}

export default App;
