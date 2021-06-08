import * as React from 'react';
import classNames from 'classnames';

import done from './../../images/done.png';

import styles from './OrderDetails.module.css';

type TModalProps = { data: string } & React.HTMLAttributes<HTMLDivElement>;

const OrderDetails = ({ className, data }: TModalProps) => (
  <div className={classNames(styles.host, className)}>
    <h2 className={`${styles.title} text text_type_digits-large mb-8`}>{data}</h2>
    <p className={`${styles.desc} text text_type_main-medium`}>
      идентификатор заказа
    </p>
    <img className={styles.img} src={done} alt='done' />
    <p className='text text_type_main-default mb-2'>
      Ваш заказ начали готовить
    </p>
    <p className='text text_type_main-default text_color_inactive'>
      Дождитесь готовности на орбитальной станции
    </p>
  </div>
);

export default OrderDetails;
