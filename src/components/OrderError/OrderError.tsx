import * as React from 'react';

type TModalProps = React.HTMLAttributes<HTMLDivElement>;

const OrderError = (): React.ReactElement<TModalProps> => (
    <p className='text text_type_main-default text_color_inactive'>
        Попробуйте еще раз создать заказ
    </p>
);

export default OrderError;
