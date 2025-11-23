export const getMinutesForm = (number: number) => {
    const howMuch = number % 10 === 1 && number % 100 !== 11 ? 'one' : [2, 3, 4].includes(number % 10) && ![12, 13, 14].includes(number % 100) ? 'few' : 'many';
    return `components.minutesForm.minutes_${howMuch}`;
};
