import * as React from 'react';
import classNames from 'classnames';

import AppHeader from './../AppHeader/AppHeader';
import BurgerIngredients from './../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from './../BurgerConstructor/BurgerConstructor';
import type { TIngredients } from './../Ingredients/Ingredients';
import type { TIngredient, TIngredientId } from './../Ingredient/Ingredient';
import Modal from './../Modal/Modal';
import OrderDetails from './../OrderDetails/OrderDetails';
import IngredientDetails from './../IngredientDetails/IngredientDetails';
import OrderError from './../OrderError/OrderError';
import { IngredientsContext, OrderIngredientsContext } from './../../services/appContext';

import styles from './App.module.css';

const DOMAIN = 'https://norma.nomoreparties.space';
const URLS = {
    GET_INGREDIENTS: '/api/ingredients',
    POST_ORDER: '/api/orders',
};

const KEY_CODES = {
    escape: 'Escape',
};

type TIngredientsRaw = { data: TIngredients; success: boolean }

type TOrderDataRaw = {
    name: string,
    order: {
        number: number
    },
    success: boolean
};

function App() {
    const [ingredients, setIngredients] = React.useState<TIngredients>([]);
    const [orderedIngredients, setOrderedIngredients] = React.useState<TIngredients>([]);

    const [orderNumber, setOrderNumber] = React.useState<number>(-1);
    const [activeIngredient, setActiveIngredient] = React.useState<TIngredient | null>(null);

    const [errorMessageLoading, setErrorMessageLoading] = React.useState<string>('');
    const [orderErrorMessage, setOrderErrorMessage] = React.useState<string>('');

    React.useEffect(() => {
        setOrderedIngredients(ingredients);
    }, [ingredients]);

    const handleLoadData = async (url: string): Promise<TIngredientsRaw | ErrorConstructor> => {
        const response = await fetch([DOMAIN, url].join(''));
        if (!response.ok) {
            throw new Error('Произошла ошибка загрузки данных');
        }
        return await response.json();
    };

    const handleOrderData = async (url: string, arr: TIngredientId[]): Promise<TOrderDataRaw | ErrorConstructor> => {
        const response = await fetch([DOMAIN, url].join(''), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({ ingredients: arr }),
        });
        if (!response.ok) {
            throw new Error('Произошла ошибка отправки заказа');
        }
        return await response.json();
    };


    React.useEffect(() => {
        handleLoadData(URLS.GET_INGREDIENTS).then(res => {
            if (typeof res === 'object' && res.data) {
                if (!res?.data.length) {
                    setErrorMessageLoading('Здесь пока нет данных');
                } else {
                    setIngredients(res?.data);
                }
            }
        }).catch((e) => {
            setErrorMessageLoading(e.message);
        });
    }, []);

    React.useEffect(() => {
        document.addEventListener('keydown', e => handleKeyDownClick(e, closeAllModals));

        return () => document.removeEventListener('keydown', e => handleKeyDownClick(e, closeAllModals));
    });

    const closeAllModals = () => {
        setActiveIngredient(null);
        setOrderNumber(-1);
        setOrderErrorMessage('');
    };

    const handleKeyDownClick = (e: KeyboardEvent, callback: () => void) => {
        if (e.code === KEY_CODES.escape) {
            callback();
        }
    };

    const handleOrderBtnClick = () => {
        handleOrderData(URLS.POST_ORDER, orderedIngredients.map(i => i._id)).then(res => {
            if (typeof res === 'object') {
                if (!res.success) {
                    setOrderErrorMessage('Произошла ошибка отправки заказа');
                } else {
                    handleStateModalOrderDetails(res.order.number);
                }
            }
        }).catch((e) => {
            setOrderErrorMessage(e.message);
        });
    };

    const handleStateModalOrderDetails = (orderNumber: number) => {
        setOrderNumber(orderNumber);
    };

    const handleClickIngredientDetails = (ingredient: TIngredient) => {
        setActiveIngredient(ingredient);
    };

    return (
        <div className={styles.host}>
            <AppHeader />
            <IngredientsContext.Provider value={{ ingredients: ingredients }}>
                <main className={classNames(styles.container, 'pt-10 pr-5 pb-10 pl-5')}>
                    <h1 className={classNames(styles.title, 'text text_type_main-large mb-5')}>Соберите бургер</h1>
                    <OrderIngredientsContext.Provider value={{ orderedIngredients: orderedIngredients }}>
                        {ingredients ? (<div className={styles.content}>
                            <BurgerIngredients className={styles.contentItem} onOpenClick={handleClickIngredientDetails} />
                            <BurgerConstructor className={styles.contentItem} onOrderBtnClick={handleOrderBtnClick} />
                        </div>) : (errorMessageLoading && <p>{errorMessageLoading}</p>)}
                    </OrderIngredientsContext.Provider>
                </main>
            </IngredientsContext.Provider>
            {orderNumber > 0 &&
            <Modal onClose={closeAllModals}><OrderDetails className={styles.orderModal} orderNumber={orderNumber} /></Modal>}
            {activeIngredient &&
            <Modal title='Детали ингредиента'
                   onClose={closeAllModals}><IngredientDetails
                ingredient={activeIngredient} /></Modal>}
            {orderErrorMessage &&
            <Modal title={orderErrorMessage}
                   onClose={closeAllModals}><OrderError /></Modal>}
        </div>
    );
}

export default App;
