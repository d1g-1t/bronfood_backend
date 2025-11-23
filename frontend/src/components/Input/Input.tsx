import { FC, useEffect, useState } from 'react';
import styles from './Input.module.scss';
import { useId } from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface Input {
    /**
     * HTML type for the input
     */
    type: string;
    /**
     * Title for input
     */
    nameLabel: string;
    /**
     * Placeholder for input
     */
    placeholder: string;
    /**
     * Name of input
     */
    name: string;
    /**
     * Register function inputs
     */
    register: UseFormRegister<FieldValues>;
    /**
     * React Hook Forms error object
     */
    errors: FieldErrors;
    /**
     * RegExp for input validation
     */
    pattern: RegExp;
    /**
     * Custom validation function
     */
    validate?: (value: FieldValues) => string | boolean;
    /**
     * Input Value
     */
    value?: string;
}

const Input: FC<Input> = (props) => {
    const [inputValue, setInputValue] = useState<string>(props.value ?? '');
    const { t } = useTranslation();
    const errorMessage = (props.errors[props.name]?.message as string) || undefined;
    const id = useId();
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    useEffect(() => {
        if (props.value) setInputValue(props.value);
    }, [props.value]);

    return (
        <div className={styles.input}>
            <label htmlFor={id} className={`${styles.input__label} ${errorMessage ? styles.input__label__error : ''}`}>
                {props.nameLabel}
            </label>
            <input
                id={id}
                className={styles.input__place}
                type={props.type}
                placeholder={props.placeholder}
                {...props.register(props.name, {
                    required: t('components.input.required'),
                    pattern: {
                        value: props.pattern,
                        message: t('components.input.errorMessage'),
                    },
                    validate: props.validate,
                })}
                onChange={handleInputChange}
                value={inputValue}
            ></input>
            {errorMessage && <p className={styles.input__error}>{errorMessage}</p>}
        </div>
    );
};

export default Input;
