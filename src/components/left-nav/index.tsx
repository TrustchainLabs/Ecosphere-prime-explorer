import { Tab } from '../common/tab'
import styles from './LeftNav.module.css'

export const LeftNav = () => {
    return (
        <div className={styles.container}>
            <img
                src='/images/brand-logo.svg'
                alt='Brand Logo'
                width={36}
            />
            <div className={styles.tabs}>
                <Tab
                    src='/icons/thermostat.svg'
                    alt='Thermostat'
                    active={false}
                />
                <Tab
                    src='/icons/gauge.svg'
                    alt='Gauge'
                    active={false}
                />
                <Tab
                    src='/icons/wind.svg'
                    alt='Wind'
                    active={false}
                />
                <Tab
                    src='/icons/compass.svg'
                    alt='Compass'
                    active={false}
                />
                <Tab
                    src='/icons/airwave.svg'
                    alt='Airwave'
                    active={false}
                />
            </div>
        </div>
    )
}
