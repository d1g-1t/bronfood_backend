import { FC, ReactNode } from 'react';
import styles from './FormInputs.module.scss';

interface FormInputs {
    children?: ReactNode;
}
/**
 * This block 'FormInputs' adds gap between inputs,
 * !!! use it only for inputs, wrap inputs !!!
 * Title h2 margin will not depend by input and
 * it will have its own margin-bottom 30px(which is needed in almost all popups).
 * Input has its own margin-top 8px cause of lable above.
 */
const FormInputs: FC<FormInputs> = (props) => {
    return <div className={styles.form__inputs}>{props.children}</div>;
};

export default FormInputs;
