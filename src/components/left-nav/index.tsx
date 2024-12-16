import { Tab } from '../common/tab'
import { UserTab } from '../user-tab'
import { TabName } from '../../shared/enums'
import styles from './LeftNav.module.css'

type LeftNavProps = {
    selectedTab: string
    onTabSelect: (tab: TabName) => void
}

export const LeftNav = ({ selectedTab, onTabSelect }: LeftNavProps) => {
    return (
        <div className={styles.container}>
            <img
                src='/images/brand-logo.svg'
                alt='Brand Logo'
                width={36}
            />
            <div className={styles.tabs}>
                <Tab
                    name={TabName.TEMPERATURE}
                    src='/icons/thermostat.svg'
                    alt='Thermostat'
                    active={selectedTab === TabName.TEMPERATURE}
                    onClick={onTabSelect}
                />
                <Tab
                    name={TabName.ATM_PRESSURE}
                    src='/icons/gauge.svg'
                    alt='Gauge'
                    active={selectedTab === TabName.ATM_PRESSURE}
                    onClick={onTabSelect}
                />
                <Tab
                    name={TabName.WIND_SPEED}
                    src='/icons/wind.svg'
                    alt='Wind'
                    active={selectedTab === TabName.WIND_SPEED}
                    onClick={onTabSelect}
                />
                <Tab
                    name={TabName.WIND_DIRECTION}
                    src='/icons/compass.svg'
                    alt='Compass'
                    active={selectedTab === TabName.WIND_DIRECTION}
                    onClick={onTabSelect}
                />
                <Tab
                    name={TabName.AIR_QUALITY}
                    src='/icons/airwave.svg'
                    alt='Airwave'
                    active={selectedTab === TabName.AIR_QUALITY}
                    onClick={onTabSelect}
                />
            </div>
            <UserTab className={styles.userTab} />
        </div>
    )
}
