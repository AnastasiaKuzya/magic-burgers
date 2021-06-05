import * as React from 'react';
import classNames from 'classnames';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './Price.module.css';

type TPriceProps = {
  price: number;
  size?: 'small' | 'medium' | 'large';
  className?: string;
};

const Price = ({ price, size = 'small', className }: TPriceProps) => (
  <span
    className={classNames(
      styles.host,
      className,
      'text',
      size === 'small' && 'text_type_digits-default',
      size === 'medium' && 'text_type_digits-medium',
      size === 'large' && 'text_type_digits-large',
    )}>
    <span className="mr-2">{price}</span>
    <CurrencyIcon type="primary" />
  </span>
);

export default Price;
