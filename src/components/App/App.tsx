import React from 'react';
import classNames from 'classnames';

import AppHeader from './../AppHeader/AppHeader';
import BurgerIngredients from './../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from './../BurgerConstructor/BurgerConstructor';

import ingredients from './../../utils/data.json';

import styles from './App.module.css';

function App() {
  return (
    <div className={styles.host}>
      <AppHeader />
      <main className={classNames(styles.container, 'pt-10 pr-5 pb-10 pl-5')}>
        <h1 className={classNames(styles.title, 'text text_type_main-large mb-5')}>Соберите бургер</h1>
        <div className={styles.content}>
          <BurgerIngredients className={styles.contentItem} ingredients={ingredients} />
          <BurgerConstructor className={styles.contentItem} ingredients={ingredients} />
        </div>
      </main>
    </div>
  );
}

export default App;
