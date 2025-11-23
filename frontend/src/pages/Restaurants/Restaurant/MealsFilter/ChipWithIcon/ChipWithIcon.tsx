import styles from './ChipWithIcon.module.scss';

type ChipWithIconProps = {
    /**
     * Text displayed on HTML element
     */
    text: string;
    /**
     * Icon displayed inside HTML element
     */
    icon: 'food' | 'drink' | 'dessert';
    /**
     * Determines whether chip is selected by user
     */
    isActive: boolean;
    /**
     * Fires when user clicks on meal's type. Sets type selected
     */
    add: () => void;
    /**
     * Fires when user clicks on meal's type. Sets type deselected
     */
    delete: () => void;
};

const ChipWithIcon = (props: ChipWithIconProps) => {
    const handleChange = () => {
        if (props.isActive) {
            props.delete();
        } else {
            props.add();
        }
    };
    return (
        <label className={`${styles.chip_with_icon} ${props.isActive ? styles.chip_with_icon_active : ''}`}>
            <input className={styles.chip_with_icon_input} type="checkbox" defaultChecked={false} onChange={handleChange} />
            <div className={`${styles.chip_with_icon_icon} ${styles[`chip_with_icon_${props.icon}`]}`} />
            <span className={`${styles.chip_with_icon_text} ${props.isActive ? styles.chip_with_icon_text_active : ''}`}>{props.text}</span>
        </label>
    );
};

export default ChipWithIcon;
