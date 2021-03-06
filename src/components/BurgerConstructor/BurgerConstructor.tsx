import * as React from 'react';
import classNames from 'classnames';

import { Button, ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import type { TIngredients } from './../Ingredients/Ingredients';
import type { TIngredient } from './../Ingredient/Ingredient';
import ScrollContainer from './../ScrollContainer/ScrollContainer';

import Price from '../../ui/Price/Price';

import styles from './BurgerConstructor.module.css';

type TBurgerConstructorProps = {
    ingredients: TIngredients;
    className?: string;
    onClick(): void;
};

const BurgerConstructor = ({ className, ingredients, onClick }: TBurgerConstructorProps) => {
    const [price, setStatePrice] = React.useState<number>(ingredients.reduce((sum, current) => sum + current.price, 0));
    const [bun, setStateBun] = React.useState<TIngredient>(ingredients[0]);

    React.useEffect(() => {
        const ing = ingredients.find(i => i.type === 'bun');
        if (ing) {
            setStateBun(ing);
        }
    }, [ingredients]);

    React.useEffect(() => {
        const sum = ingredients.reduce((sum, current) => sum + current.price, 0);
        setStatePrice(sum);
    }, [ingredients]);

    return (
        <section className={classNames(styles.host, className)}>
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
                        {ingredients.filter(i => i.type !== 'bun').map((i, index) => (
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
            <div className={`${styles.footer} mt-10 pr-10`}>
                <Price className='mr-10' price={price} size='medium' />
                <Button type='primary' size='large' onClick={onClick}>
                    ?????????? ???? ????????
                </Button>
            </div>
        </section>
    );
};

export default BurgerConstructor;
