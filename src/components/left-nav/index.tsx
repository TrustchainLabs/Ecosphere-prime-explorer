import Image from 'next/image'
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
            <Image
                src='/images/brand-logo.svg'
                alt='Brand Logo'
                width={36}
            />
            <div className={styles.tabs}>
                <Tab
                    name={TabName.TEMPERATURE}
                    tooltip='Temperature'
                    src='/icons/thermostat.svg'
                    alt='Thermostat'
                    active={selectedTab === TabName.TEMPERATURE}
                    onClick={onTabSelect}
                />
                <Tab
                    name={TabName.ATM_PRESSURE}
                    tooltip='Atm Pressure'
                    src='/icons/gauge.svg'
                    alt='Gauge'
                    active={selectedTab === TabName.ATM_PRESSURE}
                    onClick={onTabSelect}
                />
                <Tab
                    name={TabName.WIND_SPEED}
                    tooltip='Wind Speed'
                    src='/icons/wind.svg'
                    alt='Wind'
                    active={selectedTab === TabName.WIND_SPEED}
                    onClick={onTabSelect}
                />
                <Tab
                    name={TabName.WIND_DIRECTION}
                    tooltip='Wind Direction'
                    src='/icons/compass.svg'
                    alt='Compass'
                    active={selectedTab === TabName.WIND_DIRECTION}
                    onClick={onTabSelect}
                />
                <Tab
                    name={TabName.AIR_QUALITY}
                    tooltip='Air Quality'
                    src='/icons/airwave.svg'
                    alt='Airwave'
                    active={selectedTab === TabName.AIR_QUALITY}
                    onClick={onTabSelect}
                />
                <Tab
                    className={styles.addDevice}
                    name={TabName.ADD_DEVICE}
                    tooltip='Add Device'
                    src='/icons/plus.svg'
                    alt='Plus'
                    active={selectedTab === TabName.ADD_DEVICE}
                    onClick={onTabSelect}
                />
            </div>
            <UserTab className={styles.userTab} />
        </div>
    )
}
