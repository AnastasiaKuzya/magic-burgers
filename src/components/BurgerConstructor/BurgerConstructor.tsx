import * as React from 'react';
import classNames from 'classnames';

import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import type { TIngredient } from './../Ingredient/Ingredient';
import ScrollContainer from './../ScrollContainer/ScrollContainer';
import { OrderResult } from './../OrderResult/OrderResult';
import { TotalCostContext, OrderIngredientsContext } from './../../services/appContext';

import styles from './BurgerConstructor.module.css';

type TBurgerConstructorProps = {
    className?: string;
    onOrderBtnClick(): void;
};

const BurgerConstructor = ({ className, onOrderBtnClick }: TBurgerConstructorProps) => {
    const { orderedIngredients } = React.useContext(OrderIngredientsContext);

    const [totalCost, setTotalCost] = React.useState<number>(0);
    const [bun, setBun] = React.useState<TIngredient>(orderedIngredients[0]);

    const ingredientsWithoutBuns = orderedIngredients.filter((i) => i.type !== 'bun');

    React.useEffect(() => {
        const bun = orderedIngredients.find(i => i.type === 'bun');
        if (bun) {
            setBun(bun);
        }
    }, [orderedIngredients]);

    React.useEffect(() => {
        const sum = orderedIngredients.reduce((sum, current) => sum + current.price, 0);
        setTotalCost(sum);
    }, [orderedIngredients]);

    return (
        <section className={classNames(styles.host, className)}>
            <TotalCostContext.Provider value={{ totalCost: totalCost, setTotalCost: setTotalCost }}>
                <div className={`mb-10 pl-4`} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {bun && <div className={`${styles.item} pl-8 pr-2`}>
                        <ConstructorElement
                            type='top'
                            isLocked={true}
                            text={bun.name}
                            price={bun.price}
                            thumbnail={bun.image_mobile}
                        />
                    </div>}
                    <ScrollContainer style={{ maxHeight: 464 }}>
                        <ul className={styles.list} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {ingredientsWithoutBuns.map((i, index) => (
                                <li key={i._id} className={`${styles.item} pl-8 pr-2`}>
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
                    </ScrollContainer>
                    {bun && <div className={`${styles.item} pl-8`}>
                        <ConstructorElement
                            type='bottom'
                            isLocked={true}
                            text={bun.name}
                            price={bun.price}
                            thumbnail={bun.image_mobile}
                        />
                    </div>}
                </div>
                <OrderResult className='mt-10 pr-10' onOrderBtnClick={onOrderBtnClick} />
            </TotalCostContext.Provider>
        </section>
    );
};

export default BurgerConstructor;
