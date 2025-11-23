import { FC, useEffect, useState } from 'react';
import styles from './ProgressBar.module.scss';

interface ProgressBarProps {
    /**
     * The total time for the process, usually set at the beginning of the process.
     * This value represents the total duration in seconds (or any other consistent unit),
     * not a Unix timestamp.
     */
    initialTime: number;

    /**
     * The remaining time for the process, updated periodically.
     * This value should represent the remaining time in seconds (or the same unit used for initialTime)
     * at the current moment, not a Unix timestamp.
     */
    currentTime: number;
}

/**
 * A ProgressBar component that visually represents the progress of an operation.
 * It calculates the progress percentage based on the initial total time and the current remaining time.
 * The progress bar color changes when the remaining time falls below zero, indicating an overdue status.
 */
const ProgressBar: FC<ProgressBarProps> = ({ initialTime, currentTime }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (currentTime >= 0) {
            const updatedProgress = ((initialTime - currentTime) / initialTime) * 100;
            setProgress(updatedProgress);
        } else {
            setProgress(100);
        }
    }, [initialTime, currentTime]);

    const barStyle = {
        width: `${progress}%`,
        backgroundColor: currentTime < 0 ? '#f05252' : '#ff8f0b',
    };

    return (
        <div className={styles.progressBar}>
            <div className={styles.progressBar__line} style={barStyle} />
        </div>
    );
};

export default ProgressBar;
