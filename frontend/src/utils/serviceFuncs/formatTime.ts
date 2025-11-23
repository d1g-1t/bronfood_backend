export const formatTime = (timeInSeconds: number) => {
    const sign = timeInSeconds < 0 ? '-' : '';
    const absTimeInSeconds = Math.abs(timeInSeconds);
    const minutes = Math.floor(absTimeInSeconds / 60);
    const seconds = absTimeInSeconds % 60;
    return `${sign}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};
