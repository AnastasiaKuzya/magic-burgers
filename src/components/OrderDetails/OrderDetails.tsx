import * as React from 'react';
import classNames from 'classnames';
import Modal from './../Modal/Modal';

import done from './../../images/done.png';

import styles from './OrderDetails.module.css';

type TModalProps = {
  title?: string;
  className?: string;
  onClose(): void;
};

const OrderDetails = ({ className, title, onClose }: TModalProps) => {
  return (
    <Modal className={classNames(styles.host, className)} title={title} onClose={onClose}>
      <div className={styles.content}>
        <h2 className={`${styles.title} text text_type_digits-large mb-8`}>034536</h2>
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
    </Modal>
  );
};

export default OrderDetails;
