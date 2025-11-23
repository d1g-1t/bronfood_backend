import { FC } from 'react';
import { OrderState } from '../../../utils/api/orderService/orderService';
import { OrderListItem } from '../OrderListItem/OrderListItem';
import styles from './OrderListArticle.module.scss';

type OrderListArticleProps = {
    order: OrderState;
};

const OrderListArticle: FC<OrderListArticleProps> = ({ order }) => {
    return (
        <article className={styles.orderListArticle}>
            <ul className={styles.orderListArticle__list}>
                {order.orderedMeal.map((item) => (
                    <OrderListItem item={item} key={item.orderedMeal.id} />
                ))}
            </ul>
            <div className={styles.orderListArticle__amount}>
                <h3 className={styles.orderListArticle__title}>Итого: </h3>
                <h3 className={styles.orderListArticle__title}>{order.totalAmount} &#x20B8;</h3>
            </div>
        </article>
    );
};

export default OrderListArticle;
