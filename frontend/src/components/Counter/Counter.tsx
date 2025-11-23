import styles from './Counter.module.scss';

type CounterProps = {
    count: number;
    increment: () => void;
    decrement: () => void;
};

function Counter({ count, increment, decrement }: CounterProps) {
    return (
        <div className={`${styles.counter}`}>
            <button type="button" onClick={decrement} className={`${styles.counter__button} ${styles.counter__button_minus}`} />
            <span className={styles.counter__count}>{count}</span>
            <button type="button" onClick={increment} className={`${styles.counter__button} ${styles.counter__button_plus}`} />
        </div>
    );
}

export default Counter;
