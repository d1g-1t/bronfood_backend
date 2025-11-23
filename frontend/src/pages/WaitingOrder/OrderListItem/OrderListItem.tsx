import { FC } from 'react';
import { OrderState } from '../../../utils/api/orderService/orderService';
import styles from './OrderListItem.module.scss';

export const OrderListItem: FC<{ item: OrderState['orderedMeal'][number] }> = ({ item }) => (
    <li className={styles.orderListItem__item}>
        <h3 className={styles.orderListItem__title}>{item.orderedMeal.name}</h3>
        <p className={styles.orderListItem__price}>
            {item.orderedMeal.price} &#x20B8;&nbsp;
            <span className={styles.orderListItem__span}>x{item.quantity}</span>
        </p>
    </li>
);
