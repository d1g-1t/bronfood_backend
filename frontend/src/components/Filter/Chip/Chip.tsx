import styles from './Chip.module.scss';

type ChipProps = {
    /**
     * Text displayed on HTML element
     */
    text: string;
    /**
     * Determines whether chip is selected by user
     */
    isActive: boolean;
    /**
     * Fires when user clicks on venue's type. Sets type selected
     */
    add: () => void;
    /**
     * Fires when user clicks on venue's type. Sets type deselected
     */
    delete: () => void;
};

const Chip = (props: ChipProps) => {
    const handleChange = () => {
        if (props.isActive) {
            props.delete();
        } else {
            props.add();
        }
    };
    return (
        <label className={`${styles.button_element} ${props.isActive ? styles.button_element_active : ''}`}>
            <input className={styles.button_element_input} type="checkbox" defaultChecked={false} onChange={handleChange} />
            <span className={`${styles.button_element_text} ${props.isActive ? styles.button_element_text_active : ''}`}>{props.text}</span>
        </label>
    );
};

export default Chip;
