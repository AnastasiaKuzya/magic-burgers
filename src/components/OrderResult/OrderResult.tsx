import * as React from 'react';
import classNames from 'classnames';

import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { TotalCostContext } from './../../services/appContext';

import Price from '../../ui/Price/Price';

import styles from './OrderResult.module.css';

type TOrderResultProps = {
    className?: string;
    onOrderBtnClick(): void;
};

export const OrderResult = ({ className, onOrderBtnClick }: TOrderResultProps) => {
    const { totalCost } = React.useContext(TotalCostContext);
    return (
        <div className={classNames(styles.host, className)}>
            <Price className='mr-10' price={totalCost} size='medium' />
            <Button type='primary' size='large' onClick={onOrderBtnClick}>
                Нажми на меня
            </Button>
        </div>
    );
};
