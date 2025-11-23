import { MouseEvent, useState, useId, ChangeEvent, ReactNode } from 'react';
import styles from './Filter.module.scss';
import { useTranslation } from 'react-i18next';
import OptionElement from './OptionElement/OptionElement';
import { useRestaurants } from '../../utils/hooks/useRestaurants/useRestaurants';
import { Option } from '../../contexts/RestaurantsContext';
import Chip from './Chip/Chip';
import { useEsc } from '../../utils/hooks/useEsc/useEsc';

type OptionListTypes = {
    /**
     * List of options to be rendered
     */
    options: Option[];
    /**
     * Indicates whether option has been selected by user
     */
    selected: boolean;
    /**
     * Fires when user clicks on option. Sets option selected or deselected
     * @param {Option} option
     */
    action: (option: Option) => void;
};

const OptionList = ({ options, selected, action }: OptionListTypes) => {
    return (
        <ul className={`${styles.filter__options} ${!selected && styles.filter__options_nowrap}`}>
            {options.map((option) => (
                <li key={option.id}>
                    <OptionElement text={option.name} selected={selected} onClick={() => action(option)} />
                </li>
            ))}
        </ul>
    );
};

const Filter = ({ name, close, children }: { name?: string; close: () => void; children?: ReactNode }) => {
    const { options, venueTypes } = useRestaurants();
    const [inputValue, setInputValue] = useState('');
    const { t } = useTranslation();
    const textId = useId();
    const buttonId = useId();
    const searchValue = inputValue.trim();
    const suggestedOptions: Option[] = searchValue ? options.all.filter((opt) => opt.name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1) : [];
    const nothingFound = suggestedOptions.length === 0 && inputValue !== '';
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };
    const handleOverlayClick = (e: MouseEvent) => {
        if (e.target === e.currentTarget) {
            close();
        }
    };
    useEsc(() => close(), [close]);
    return (
        <div className={styles.filter_overlay} onClick={handleOverlayClick}>
            <div className={styles.filter}>
                <div className={styles.filter__title_container}>
                    <button className={styles.filter__icon_back} type="button" onClick={close} />
                    {name ? <p className={`${styles.filter__text} ${styles.filter__text_bold}`}>{t(`pages.filter.${name}`)}</p> : <div className={styles.filter__empty_div}></div>}
                </div>
                <div className={styles.filter__search_container}>
                    <label htmlFor={textId} className={styles.filter__text}>
                        {t('pages.filter.enterSearchString')}
                    </label>
                    <div className={styles.filter__options_container}>
                        <div className={styles.filter__input_container}>
                            <div className={styles.filter__icon_search} />
                            <input id={textId} onChange={handleChange} value={inputValue} className={styles.filter__input} type="text" placeholder={t('pages.filter.placeholder')} />
                        </div>
                        <div className={styles.filter__options_list}>
                            {nothingFound ? <p className={styles.filter__nothingFound}>{t('pages.filter.nothingFound')}</p> : <OptionList options={suggestedOptions} selected={false} action={options.addOption} />}
                            <OptionList options={options.selectedOptions} selected={true} action={options.deleteOption} />
                        </div>
                    </div>
                </div>
                <div className={styles.filter__search_container}>
                    <label htmlFor={buttonId} className={styles.filter__text}>
                        {t('pages.filter.chooseTypeOfVenue')}
                    </label>
                    <ul className={`${styles.filter__types}`}>
                        {venueTypes.all.map((type) => {
                            const isActive = venueTypes.selectedVenueTypes.includes(type);
                            return (
                                <li key={type.id}>
                                    <Chip text={t(`pages.filter.${type.name}`)} isActive={isActive} add={() => venueTypes.addVenueType(type)} delete={() => venueTypes.deleteVenueType(type)} />
                                </li>
                            );
                        })}
                    </ul>
                </div>
                {children}
            </div>
        </div>
    );
};

export default Filter;
