export const makeCamelCaseErrorMessage = (str: string) => {
    let words = str.split(' ');
    words = words.map((word) => {
        word.toLowerCase();
        return word[0].toUpperCase() + word.slice(1);
    });
    const result = words.join('');
    return result[0].toLowerCase() + result.slice(1);
};
