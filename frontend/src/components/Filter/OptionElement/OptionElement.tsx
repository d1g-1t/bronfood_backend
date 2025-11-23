import styles from './OptionElement.module.scss';

type OptionProps = {
    /**
     * Indicates whether option has been selected by user. True / false
     */
    selected: boolean;
    /**
     * Text displayed on HTML element
     */
    text: string;
    /**
     * Fires when user clicks on option. Sets option selected or deselected
     */
    onClick: () => void;
};

const OptionElement = (props: OptionProps) => {
    return (
        <div onClick={!props.selected ? props.onClick : undefined} className={`${styles.option} ${props.selected ? styles.option_selected : ''}`}>
            <span className={styles.option__text}>{props.text}</span>
            <button type="button" onClick={props.onClick} className={`${styles.option__icon} ${props.selected ? styles.option__icon_visible : ''}`} />
        </div>
    );
};

export default OptionElement;
