import * as React from 'react';
import classNames from 'classnames';

import AppHeader from './../AppHeader/AppHeader';
import BurgerIngredients from './../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from './../BurgerConstructor/BurgerConstructor';
import type { TIngredients } from './../Ingredients/Ingredients';
import type { TIngredient } from './../Ingredient/Ingredient';
import Modal from './../Modal/Modal';
import OrderDetails from './../OrderDetails/OrderDetails';
import IngredientDetails from './../IngredientDetails/IngredientDetails';

import styles from './App.module.css';

const URL = 'https://norma.nomoreparties.space/api/ingredients';
const KEY_CODES = {
  escape: 'Escape',
};

function App() {
  const [ingredients, setIngredients] = React.useState<TIngredients | null>(null);
  const [isOrderDetailsOpen, setStateIsOrderDetailsOpen] = React.useState<boolean>(false);
  const [isShowIngredientDetails, setStateIsShowIngredientDetails] = React.useState<boolean>(false);
  const [activeIngredient, setStateActiveIngredient] = React.useState<TIngredient | null>(null);
  const [isError, setIsError] = React.useState<string>('');

  const handleLoad = async (): Promise<{ data: TIngredients; success: boolean } | undefined> => {
    try {
      const response = await fetch(URL);

      if (!response.ok) {
        throw new Error('Произошла ошибка загрузки данных');
      }

      return await response.json();
    } catch (e) {
      console.error(e);
      setIsError(e);
    }
  };


  React.useEffect(() => {
    handleLoad().then(res => {
      if (typeof res !== 'undefined') {
        if (!res.data.length) {
          setIsError('Здесь пока нет данных');
          return;
        }
        setIngredients(res.data);
      }
    });
  }, []);

  React.useEffect(() => {
    document.addEventListener('keydown', e => closeAllModals(e));

    return () => document.removeEventListener('keydown', e => closeAllModals(e));
  });

  const closeAllModals = (e: KeyboardEvent) => {
    if (e.code === KEY_CODES.escape) {
      setStateIsOrderDetailsOpen(false);
      setStateIsShowIngredientDetails(false);
    }
  };

  const handleStateModalOrderDetails = () => {
    setStateIsOrderDetailsOpen(!isOrderDetailsOpen);
  };

  const handleStateModalIngredientDetails = () => {
    setStateIsShowIngredientDetails(!isShowIngredientDetails);
  };


  const handleClickIngredientDetails = (ingredient: TIngredient) => {
    handleStateModalIngredientDetails();
    setStateActiveIngredient(ingredient);
  };

  return (
    <div className={styles.host}>
      <AppHeader />
      <main className={classNames(styles.container, 'pt-10 pr-5 pb-10 pl-5')}>
        <h1 className={classNames(styles.title, 'text text_type_main-large mb-5')}>Соберите бургер</h1>
        {ingredients ? (<div className={styles.content}>
          <BurgerIngredients className={styles.contentItem} ingredients={ingredients}
                             onClick={handleClickIngredientDetails} />
          <BurgerConstructor className={styles.contentItem} ingredients={ingredients}
                             onClick={handleStateModalOrderDetails} />
        </div>) : (isError && <p>Произошла ошибка загрузки данных</p>)}
      </main>
      {isOrderDetailsOpen &&
      <Modal onClose={handleStateModalOrderDetails}><OrderDetails className={styles.orderModal} /></Modal>}
      {isShowIngredientDetails && activeIngredient &&
      <Modal title='Детали ингредиента'
             onClose={handleStateModalIngredientDetails}><IngredientDetails
        ingredient={activeIngredient} /></Modal>}
    </div>
  );
}

export default App;
