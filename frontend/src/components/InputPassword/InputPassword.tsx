import { FC, useState } from 'react';
import styles from './InputPassword.module.scss';
import { useId } from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { regexPassword } from '../../utils/consts';
import { useTranslation } from 'react-i18next';
import HidePasswordIcon from '../../vendor/images/icons/hide-password-icon.svg?react';
import ShowPasswordIcon from '../../vendor/images/icons/show-password-icon.svg?react';

interface InputPassword {
    /**
     * Name of input
     */
    name: string;
    /**
     * Input label
     */
    nameLabel: string;
    /**
     * Placeholder for input
     */
    register: UseFormRegister<FieldValues>;
    /**
     * React Hook Forms error object
     */
    errors: FieldErrors;
    /**
     * Custom validation function
     */
    validate?: (value: FieldValues) => string | boolean;
    /**
     * Input required: True/False
     */
    required?: boolean;
}

const InputPassword: FC<InputPassword> = (props) => {
    const { t } = useTranslation();
    const errorMessage = (props.errors[props.name]?.message as string) || undefined;
    const id = useId();
    const [isPasswordInvisible, setIsPasswordInvisible] = useState(true);
    const togglePasswordVisibility = () => setIsPasswordInvisible(!isPasswordInvisible);
    const visibilityIcon = isPasswordInvisible ? <HidePasswordIcon className={styles.input__hideIcon} onClick={togglePasswordVisibility} /> : <ShowPasswordIcon className={styles.input__hideIcon} onClick={togglePasswordVisibility} />;

    return (
        <div className={styles.input}>
            <label htmlFor={id} className={`${styles.input__label} ${errorMessage ? styles.input__label__error : ''}`}>
                {props.nameLabel}
            </label>
            <input
                id={id}
                className={styles.input__place}
                type={isPasswordInvisible ? 'password' : 'text'}
                placeholder={isPasswordInvisible ? '******' : '123456'}
                {...props.register(props.name, {
                    required: props.required && t('components.inputPassword.required'),
                    pattern: {
                        value: regexPassword,
                        message: t('components.inputPassword.errorMessage'),
                    },
                    minLength: {
                        value: 4,
                        message: t('components.inputPassword.minLengthErrorMessage') + ' 4',
                    },
                    maxLength: {
                        value: 256,
                        message: t('components.inputPassword.maxLengthErrorMessage') + ' 256',
                    },
                    validate: props.validate,
                })}
                autoComplete="off"
            ></input>
            {visibilityIcon}
            {errorMessage && <p className={styles.input__error}>{errorMessage}</p>}
        </div>
    );
};

export default InputPassword;
